var common = require('./common.json');
var local = null;

try {
  local = require('./local.json');
} catch (e) {
}

if (local) {
  Object.keys(local).forEach(function (key) {
    common[key] = local[key];
  })
}
module.exports = common;
