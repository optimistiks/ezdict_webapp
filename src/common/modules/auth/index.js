var Promise = require('bluebird');

var api = require('../api');
var tokenStorage = require('../token-storage');
var browserExtension = require('../browser-extension');


var auth = {
    userInfo: null
};

auth.saveTokenFromExtension = function () {
    if (browserExtension) {
        return browserExtension.getToken().then(function (token) {
            return tokenStorage.saveToken(token);
        }).catch(function () {
            console.info('Can\'t get token from extension.');
        });
    } else {
        return Promise.reject().catch(function () {
            console.info('Browser extension was not detected.');
        });
    }
};

auth.isLoggedIn = function () {

    if (this.userInfo) {
        return Promise.resolve(this.userInfo);
    } else {

        return this.saveTokenFromExtension()

          .finally(() => api.getUserInfo().then((userInfo) => {
              this.userInfo = userInfo;
              return userInfo;
          }));

    }

};

auth.logout = function () {
    return api.logout().then(function () {
        this.userInfo = null;
    }.bind(this))
};

auth.login = function (formData) {
    return api.login(formData).then(function (response) {
        if (browserExtension) {
            browserExtension.saveToken(response.auth_token).catch(function () {
                console.info('Can\'t save token to extension.');
            });
        }
        return response;
    });
};

auth.register = function (formData) {
    return api.register(formData).then(function (response) {
        if (browserExtension) {
            browserExtension.saveToken(response.auth_token).catch(function () {
              console.info('Can\'t save token to extension.');
            });
        }
        return response;
    });
};

auth.getUserInfo = function () {
    return this.userInfo;
};

module.exports = auth;
