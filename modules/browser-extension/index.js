var Promise = require('bluebird');
var config = require('../../config');

var chromeExtension = {
  extensionId: config.chromeExtensionId
};

chromeExtension.getToken = function () {
  var deferred = Promise.pending();
  chrome.runtime.sendMessage(this.extensionId, {getToken: true}, function (token) {
    if (token) {
      deferred.resolve(token);
    } else {
      deferred.reject();
    }
  });
  return deferred.promise;
};

var app = null;

if (window.chrome) {
  app = chromeExtension;
}

module.exports = app;
