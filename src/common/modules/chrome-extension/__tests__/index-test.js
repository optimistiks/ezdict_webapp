jest.dontMock('../index.js');
jest.dontMock('../../../../../config');

describe('chrome-extension', function () {

    var chromeExtension = null;

    beforeEach(function () {

        chromeExtension = require('../index.js');

        global.chrome = {
            runtime: {
                sendMessage: function (extensionId, payload, callback) {
                }
            }
        };

    });

    it('should call chrome.runtime.sendMessage with proper arguments when getting a token', function () {

        spyOn(global.chrome.runtime, 'sendMessage');

        chromeExtension.getToken();

        var config = require('../../../../../config');

        expect(global.chrome.runtime.sendMessage).toHaveBeenCalledWith(
            config.chromeExtensionId,
            {getToken: true},
            function () {
            }
        );

    });

    it('should resolve the promise when the token is found', function () {

        global.chrome.runtime.sendMessage = function (extensionId, payload, callback) {
            callback.apply(this, ['some_token']);
        };

        var promise = chromeExtension.getToken();

        expect(promise.isFulfilled()).toEqual(true);

    });

    it('should reject the promise when the token is not found', function () {

        global.chrome.runtime.sendMessage = function (extensionId, payload, callback) {
            callback.apply(this, [null]);
        };

        var promise = chromeExtension.getToken();

        expect(promise.isRejected()).toEqual(true);

    });

    it('should call chrome.runtime.sendMessage with proper arguments when saving a token', function () {

      spyOn(global.chrome.runtime, 'sendMessage');

      chromeExtension.saveToken('some_token');

      var config = require('../../../../../config');

      expect(global.chrome.runtime.sendMessage).toHaveBeenCalledWith(
        config.chromeExtensionId,
        {saveToken: 'some_token'},
        function () {
        }
      );

    });

    it('should resolve the promise when the token is saved', function () {

      global.chrome.runtime.sendMessage = function (extensionId, payload, callback) {
        callback.apply(this, [payload.saveToken]);
      };

      var promise = chromeExtension.saveToken('some_token');

      expect(promise.isFulfilled()).toEqual(true);

    });

    it('should reject the promise when the token is not saved', function () {

      global.chrome.runtime.sendMessage = function (extensionId, payload, callback) {
        callback.apply(this, [null]);
      };

      var promise = chromeExtension.saveToken('some_token');

      expect(promise.isRejected()).toEqual(true);

    });

    afterEach(function () {
        global.chrome = undefined;
        chromeExtension = null;
    });

});
