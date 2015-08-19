//todo: избавиться от deferred

var api = require('../api');
var $ = require('jquery');
var browserExtension = require('../browser-extension');
var Promise = require('bluebird');

var auth = {
  userInfo: null
};

auth.saveTokenFromExtension = function () {
  if (browserExtension) {
    return browserExtension.getToken().then(function (token) {
      //todo: заменить на auth.saveToken (см. todo к storage)
      return api.saveToken(token);
    }).catch(function () {
    });
  } else {
    var deferred = Promise.pending();
    deferred.reject();
    return deferred.promise.catch(function() {});
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
          .done(function (userInfo) {
            this.userInfo = userInfo;
            def.resolve();
          }.bind(this))
          .fail(function () {
            def.reject();
          })
      }.bind(this));
  }
  return def.promise();
};

auth.logout = function () {
  return api.logout().done(function () {
    this.userInfo = null;
  }.bind(this))
};

auth.login = function (formData) {
  return api.login(formData)
};

auth.register = function (formData) {
  return api.register(formData)
};

auth.getUserInfo = function () {
  return this.userInfo;
};

module.exports = auth;
