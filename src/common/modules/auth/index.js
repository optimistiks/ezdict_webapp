//todo: избавиться от deferred

var $ = require('jquery');
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
        var deferred = Promise.pending();
        deferred.reject();
        return deferred.promise.catch(function (exception) {
            console.error(exception);
        });
    }
};

auth.isLoggedIn = function () {
    var def = $.Deferred();
    if (this.userInfo) {
        def.resolve();
    } else {
        this.saveTokenFromExtension()
            .finally(function () {
                api.getUserInfo()
                    .then(function (userInfo) {
                        this.userInfo = userInfo;
                        def.resolve();
                    }.bind(this))
                    .catch(function () {
                        def.reject();
                    })
            }.bind(this));
    }
    return def.promise();
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
