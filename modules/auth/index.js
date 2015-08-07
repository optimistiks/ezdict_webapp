var api = require('../api');
var $ = require('jquery');
var auth = {
  userInfo: null
};

auth.isLoggedIn = function () {
  var def = $.Deferred();
  if (this.userInfo) {
    def.resolve();
  } else {
    api.getUserInfo()
      .done(function (userInfo) {
        this.userInfo = userInfo;
        def.resolve();
      }.bind(this))
      .fail(function () {
        def.reject();
      })
  }
  return def.promise();
};

auth.login = function (formData) {
  return api.login(formData)
};

auth.register = function (formData) {
  return api.register(formData)
};

module.exports = auth;