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

    it('should resolve the promise when the token is found', function (done) {

        global.chrome.runtime.sendMessage = function (extensionId, payload, callback) {
            console.log('set timeout');
            setTimeout(function () {
                console.log('timeout');
                callback.apply(this, ['some_token']);
            }, 1000)
        };

        var promise = chromeExtension.getToken();

        promise
            .then(function (token) {
                expect(token).toEqual('some_tokens');
            })
            .finally(done);

    });

    it('should reject the promise when the token is not found', function (done) {

        global.chrome.runtime.sendMessage = function (extensionId, payload, callback) {
            setTimeout(function () {
                callback.apply(this, [null]);
            }, 1000)
        };

        var promise = chromeExtension.getToken();

        promise
            .catch(function () {
                expect(promise.isRejected()).toBeFalsy();
            })
            .finally(done);

    });

    afterEach(function () {
        global.chrome = undefined;
        chromeExtension = null;
    });

});
