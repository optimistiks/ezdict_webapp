var Promise = require('bluebird');
var config = require('../../../../config');

var chromeExtension = {
    extensionId: config.chromeExtensionId
};

chromeExtension.getToken = function () {
    var deferred = Promise.pending();
    chrome.runtime.sendMessage(this.extensionId, {getToken: true}, function (token) {
        console.log('in callback', token);
        if (token) {
            console.log('resolving promise with', token);
            deferred.resolve(token);
        } else {
            deferred.reject('Can\'t get token from chrome extension.');
        }
    });
    return deferred.promise;
};

chromeExtension.saveToken = function (token) {
    var deferred = Promise.pending();
    chrome.runtime.sendMessage(this.extensionId, {saveToken: token}, function (token) {
        if (token) {
            deferred.resolve(token);
        } else {
            deferred.reject('Can\'t save token to chrome extension.');
        }
    });
    return deferred.promise;
};

module.exports = chromeExtension;
