/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 894:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadConf = loadConf;
exports.loadSafeConf = loadSafeConf;
const fs_1 = __webpack_require__(896);
const zod_1 = __webpack_require__(569);
const safeConsole_1 = __webpack_require__(513);
const stringifyIssues_1 = __webpack_require__(344);
const accessKeyRe = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/;
const gtmIdRe = /^GTM-[A-Z\d]{8,}$/;
const guiSchema = zod_1.z.object({
    gtmId: zod_1.z.string().regex(gtmIdRe).default(''),
    web3formsAccessKey: zod_1.z.string().regex(accessKeyRe).default(''),
});
const portSchema = zod_1.z.number().min(1).max(65535);
const confSchema = zod_1.z.object({
    devGuiPort: portSchema.default(3000),
    host: zod_1.z.string().min(1),
    http: portSchema.default(80),
    https: portSchema.nullable().default(443),
    sslCert: zod_1.z.string().min(1).nullable().optional(),
    gui: guiSchema,
});
const strictConfSchema = confSchema
    .omit( true ? { devGuiPort: true } : 0)
    .strict()
    .extend({ gui: guiSchema.strict() });
class ConfError extends Error {
    code;
    cause;
    constructor(arg0, arg1) {
        super(arg1 ?? String(arg0));
        this.code = typeof arg0 === 'number' ? arg0 : typeof arg0 === 'string' ? 0 : 500;
        this.cause = typeof arg0 === 'object' ? arg0 : void 0;
    }
}
function parseConf(raw, data) {
    try {
        return { data: data ? strictConfSchema.parse(raw) && data : confSchema.parse(raw) };
    }
    catch (cause) {
        if (cause instanceof zod_1.z.ZodError) {
            const code = data ? 0 : 400;
            const message = data ? 'Configuration warning' : 'Invalid configuration';
            return { data, error: new ConfError(code, `${message} in ${file}:\n${(0, stringifyIssues_1.stringifyIssues)(cause).join('\n')}`) };
        }
        else {
            return { data, error: new ConfError({ cause }, `Configuration loading failure:\n${file}`) };
        }
    }
}
const file = `conf/${"production"}.json`;
function loadConf() {
    const raw = JSON.parse((0, fs_1.readFileSync)(file, 'utf8'));
    const parsedConf = parseConf(raw);
    Object.assign(global, { conf: parsedConf.data?.gui });
    return { file, ...(parsedConf.error ? parsedConf : parseConf(raw, parsedConf.data)) };
}
function loadSafeConf(silent = false) {
    const loadedConf = loadConf();
    if (loadedConf.data) {
        if (!silent) {
            // console.log('Configuration:', loadedConf.file, loadedConf.data);
            if (loadedConf.error) {
                safeConsole_1.safeConsole.error(loadedConf.error.message);
            }
        }
        return loadedConf.data;
    }
    else {
        safeConsole_1.safeConsole.error(loadedConf.error.message);
        if (loadedConf.error.cause) {
            safeConsole_1.safeConsole.error(loadedConf.error.cause);
        }
        process.exit(loadedConf.error.code);
    }
}


/***/ }),

/***/ 513:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.devConsole = exports.safeConsole = void 0;
/* eslint-disable @typescript-eslint/unbound-method */
const voidFunction =  true ? () => void 0 : 0;
exports.safeConsole = console;
exports.devConsole = {
    error: voidFunction ?? exports.safeConsole.error,
    log: voidFunction ?? exports.safeConsole.log,
    warn: voidFunction ?? exports.safeConsole.log,
};


/***/ }),

/***/ 518:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.splitUnrecognizedKeys = splitUnrecognizedKeys;
const unexpectedKey = (...path) => ({ code: 'custom', path, message: 'Unexpected key' });
const unexpectedKeys = ({ keys, path }) => keys.map((key) => unexpectedKey(...path, key));
function splitUnrecognizedKeys(issues) {
    return issues.map((issue) => (issue.code === 'unrecognized_keys' ? unexpectedKeys(issue) : issue)).flat(1);
}


/***/ }),

/***/ 617:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringifyIssue = stringifyIssue;
const stringifyPath_1 = __webpack_require__(407);
function stringifyIssue(issue, prefix = '  ') {
    const path = (0, stringifyPath_1.stringifyPath)(issue.path);
    return `${prefix}${path}${path && ': '}${issue.message}`;
}


/***/ }),

/***/ 344:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringifyIssues = stringifyIssues;
const stringifyIssue_1 = __webpack_require__(617);
const splitUnrecognizedKeys_1 = __webpack_require__(518);
function stringifyIssues(issues, prefix = '  ') {
    const actualIssues = (0, splitUnrecognizedKeys_1.splitUnrecognizedKeys)(issues instanceof Array ? issues : issues.issues);
    return actualIssues.map((issue) => (0, stringifyIssue_1.stringifyIssue)(issue, prefix)).sort();
}


/***/ }),

/***/ 407:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringifyPath = stringifyPath;
function stringifyPath(path) {
    const keys = path.map((key) => {
        const strKey = String(key);
        if (/^(0|[1-9]\d*)$/.test(strKey)) {
            return `[${strKey}]`;
        }
        else if (/^[^\W\d]\w*$/.test(strKey)) {
            return `.${strKey}`;
        }
        else {
            return `[${JSON.stringify(strKey)}]`;
        }
    });
    return keys.join('');
}


/***/ }),

/***/ 569:
/***/ ((module) => {

module.exports = require("zod");

/***/ }),

/***/ 896:
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.conf = void 0;
const load_1 = __webpack_require__(894);
exports.conf = (0, load_1.loadSafeConf)(true);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;