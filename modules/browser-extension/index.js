var Promise = require('bluebird');
var config = require('../../config');

var chromeExtension = {
  extensionId: config.chromeExtensionId
};

chromeExtension.getToken = function () {
  var deferred = Promise.pending();
  chrome.runtime.sendMessage(this.extensionId, {getToken: true}, function (response) {
    console.log('response from extension', response);
  });
  return deferred.promise;
};

var app = null;

if (chrome) {
  app = chromeExtension;
}

module.exports = app;
