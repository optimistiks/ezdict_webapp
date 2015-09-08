var Promise = require('bluebird');

var tokenStorage = {};

tokenStorage.getToken = function () {
    return Promise.resolve(global.localStorage.getItem('auth_token'));
};

tokenStorage.saveToken = function (token) {
    return Promise.resolve(global.localStorage.setItem('auth_token', token));
};

tokenStorage.removeToken = function () {
    return Promise.resolve(global.localStorage.removeItem('auth_token'));
};

module.exports = tokenStorage;
