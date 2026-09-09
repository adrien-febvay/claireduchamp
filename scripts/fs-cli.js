const { constants, copyFileSync, mkdirSync, readdirSync, renameSync, statSync } = require('fs');
const { basename, dirname, join, isAbsolute, sep } = require('path');

const SYNTAX = `
node scripts/fs-cli [cpy|li|mv|rm][?] [source-path] [dist-path]

[dist-path] is relative to [source-path]

i.e. node scripts/fs-cli mv /some-path/foo-*-*.md ../other-path-%2/bar-%1.md
`.trim();

function exit(code, ...message) {
  if (message.length) {
    console[code ? 'error' : 'log'](...message);
  }
  process.exit(code);
}

// const color = (code, text) => `\x1b[${code}m${text}\x1b[0m`;
// const red = (text) => color(31, text);
// const yellow = (text) => color(33, text);

const specialCharsRx = /[.*+?^${}()|[\]\\]/g;
const wildCharsRx = /\*{2,}|[.*+?^${}()|[\]\\]/g;

const escapeRxPart = (literal) => literal.replace(specialCharsRx, '\\$&');
const unionRx = (arr) => new RegExp(`(?:${arr.map(escapeRxPart).join('|')})`, 'g');

const sepRxPart = escapeRxPart(sep);
const anySepRx = unionRx([...new Set(['/', '\\', sep])]);
const notSepRxPart = `[^${sepRxPart}]`;
const wildChars = { '?': `(${notSepRxPart})`, '*': `(${notSepRxPart}*)`, '**': '(.*)' };
const anyWildCharRx = unionRx(Object.keys(wildChars));
const cwdRx = new RegExp(`^.(${sepRxPart}|$)`);

const pathRxPattern = (path) => path.replace(wildCharsRx, (match) => wildChars[match] ?? `\\${match}`);

function splitPath(path) {
  const patterns = [];
  const dirs = [];
  for (const chunk of path.split(anySepRx)) {
    if (patterns.length || /[?*]/.test(chunk)) {
      patterns.push(chunk);
    } else {
      dirs.push(chunk);
    }
  }
  return [dirs.length ? dirs.join(sep) : '.', patterns];
}

const wholeStringRx = (pattern) => new RegExp(`^${pattern}$`);

function getPatternRxs(dir, rawPatternParts) {
  const patternParts = rawPatternParts.map((rawPatternPart) => {
    const adjustedPatternPath = rawPatternPart === '**' ? '**' : `${sep}${rawPatternPart}`;
    return adjustedPatternPath.split(/(?<=\*\*)/);
  });
  const patternRxParts = [dir, ...patternParts].flat().map(pathRxPattern);
  const fullPatternRx = wholeStringRx(patternRxParts.join(''));
  const partialPatternRx = wholeStringRx(patternRxParts.reverse().reduce((pattern, patternPart) => {
    return `${patternPart}(?:${pattern})?`;
  }));
  const wildCharCount = rawPatternParts.join('').split(anyWildCharRx).length - 1;
  return { fullPatternRx, partialPatternRx, wildCharCount };
}

function scanDir(dir, { fullPatternRx, partialPatternRx }) {
  function* scanDir(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = `${dir}${sep}${entry.name}`;
      const match = fullPatternRx.exec(path);
      if (match) {
        yield [...match];
      } else if (partialPatternRx && entry.isDirectory()) {
        for (const match of scanDir(path)) {
          yield match;
        }
      }
    }
  }
  return scanDir(dir);
}

function makeReplacementPattern(rawPattern) {
  const patternParts = [];
  let textConcat = '';
  for (const [, text, tokenIndex, escapedChar = ''] of rawPattern.matchAll(/([^&]*?)(?:%(\d+);?|%(\D?)|$)/g)) {
    textConcat += text + escapedChar;
    if (tokenIndex) {
      if (textConcat) {
        patternParts.push(textConcat);
        textConcat = '';
      }
      patternParts.push(parseInt(tokenIndex));
    }
  }
  if (textConcat) {
    patternParts.push(textConcat);
  }
  return patternParts;
}

function minMax(inputs) {
  const numbers = inputs && inputs.filter((value) => typeof value === 'number');
  return numbers && numbers.length ? [Math.min(...numbers), Math.max(...numbers)] : [];
}

function getNewPath(replacementPattern, match) {
  let newPath = replacementPattern.map((part) => typeof part === 'number' ? match[part] ?? '' : part).join('');
  newPath = newPath.at(-1) === sep ? newPath + basename(match[0]) : newPath;
  return isAbsolute(newPath) || cwdRx.test(newPath) ? newPath : join(dirname(match[0]), newPath);
}

function isBetween(num, min, max) {
  return num >= min && num <= max;
}

function existsSync(path) {
  try {
    statSync(path);
    return true;
  } catch (error) {
    if (error instanceof Error && error.code === 'ENOENT') {
      return false;
    } else {
      throw error;
    }
  }
}

function output(src, code, dist) {
  const msg = `${code ? `[${code}] ` : ''}${src}${dist ? `\n  => ${dist}`: ''}`;
  const fn = code ? console.error : console.log;
  fn(msg);
}

function fsError(code, message, src, dist = null) {
  return Object.assign(new Error(`${code}: message`), { code, src, dist, custom: true });
}

function nodistError(src) {
  return fsError('ENODIST', `no destination path for: ${src}`, src);
}

function duplicateError(src, dist) {
  return fsError('EDUP', `duplicate destination path: ${dist}`, src, dist);
}

function existsError(src, dist) {
  return fsError('EEXIST', `entry already exists: ${dist}`, src, dist);
}

function getError(cb) {
  try {
    cb();
  } catch (error) {
    // !(error instanceof Error && error.code) && console.log(error);
    return error instanceof Error && error.code ? error : fsError('E500', 'An unexpected error occured');
  }
}

function cpy(src, dist) {
  mkdirSync(dirname(dist), { recursive: true });
  copyFileSync(src, dist, constants.COPYFILE_EXCL);
}

function mv(src, dist) {
  mkdirSync(dirname(dist), { recursive: true });
  renameSync(src, dist);
}

function rm(src) {
  rmSync(src);
}

const actions = { cpy, li: null, mv, rm };

const [, , mode, src, dist] = process.argv;
const testMode = mode?.at(-1) === '?';
const action = testMode ? mode?.slice(0, -1) : mode;
const minArgv = testMode || action === 'rm' || action === 'li' ? 4 : 5;
const maxArgv = action === 'rm' ? 4 : 5;
const argvLen = process.argv.length;
if (!isBetween(process.argv.length, minArgv, maxArgv) || !/^(cpy|li|mv|rm)$/.test(action) || src === '' || dist === '') {
  exit(1, SYNTAX);
} else if (src.includes('***')) {
  exit(401, 'Invalid pattern:', src);
} else if (dist === '') {
  exit(401, 'Empty replacement pattern');
} else {
  const [dir, patternParts] = splitPath(src);
  const patternRxs = getPatternRxs(dir, patternParts);
  const replacementPattern = dist ? makeReplacementPattern(dist) : null;
  const [minTokenIndex, maxTokenIndex] = minMax(replacementPattern);
  if (minTokenIndex <= 0) {
    exit(401, 'Invalid replacement token %0');
  } else if (maxTokenIndex > patternRxs.wildCharCount) {
    exit(401, 'Replacement token(s) does not match capture groups');
  }
  const newPaths = {};
  for (const match of scanDir(dir, patternRxs)) {
    const newPath = replacementPattern ? getNewPath(replacementPattern, match) : '';
    const priorCount = (newPath && newPaths[newPath]) || 0;
    const error = getError(() => {
      if (replacementPattern && !newPath) {
        throw nodistError(match[0]);
      } else if (priorCount) {
        throw duplicateError(match[0], newPath);
      } else if (newPath && testMode && action !== 'li' && existsSync(newPath)) {
        throw existsError(match[0], newPath);
      } else if (!testMode) {
        actions[action]?.(match[0], newPath);
      }
    });
    if (newPath && !error) {
      newPaths[newPath] = priorCount + 1;      
    }
    output(match[0], error?.code, newPath);
  }
}
