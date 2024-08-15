const path = require('path');

console.log(path.resolve('a/b/c'))
console.log(path.resolve('a/b/c', '/d/e/f'))
console.log(path.join('a/b/c', 'd/e/f'));
