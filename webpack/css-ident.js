const { readFileSync, writeFileSync } = require('fs');
const resolve = require('./resolve');

let dict = {};
let idIndex = 0;
const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
const miniCss = process.env.NODE_ENV === 'production';
const srcDir = resolve.srcDir('gui');

function generateId() {
  function convert(num) {
    const next = num >= 36 ? convert(Math.floor(num / 36)) : '';
    return alphabet[num % 36] + next;
  }
  let id;
  do {
    id = convert(idIndex++, 26);
    idIndex += idIndex % 36 >= 26 ? 10 : 0;
  } while (/^ad\d*$/.test(id));
  return id;
}

function toId(key) {
  return dict[key] = dict[key] ?? generateId();
}

function getLocalIdent(context, localIdentName, localName) {
  const resource = context.resourcePath.slice(srcDir.length + 1, -5).replace(/\\/g, '/');
  return toId(`${resource}/${localName}`);
};

function loadLocalIdent(file) {
  dict = JSON.parse(readFileSync(file, 'utf-8'));
}

function saveLocalIdent(file) {
  writeFileSync(file, JSON.stringify(dict, null, 2), 'utf-8');
}

function runOnce(fn) {
  return (...args) => {
    fn?.(...args);
    fn = null;
  }
}

class SaveLocalIdent {
  constructor(file) {
    this.file = file;
  }

  apply = runOnce((compiler) => {
    if (miniCss) {
      compiler.hooks.afterEmit.tap('Gui.emit', runOnce(() => saveLocalIdent(this.file)));
    }
  });
}

module.exports = {
  getLocalIdent: miniCss ? getLocalIdent : void 0,
  loadLocalIdent: miniCss ? loadLocalIdent : () => {},
  SaveLocalIdent,
};