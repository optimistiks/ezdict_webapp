var chromeExtension = require('../chrome-extension');

var extension = null;

if (global.chrome && global.chrome.runtime) {
  extension = chromeExtension;
}

module.exports = extension;
