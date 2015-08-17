var auth = require('../../modules/auth');
module.exports = {
  statics: {
    willTransitionTo: function (transition, params, query, props) {
      auth.isLoggedIn()
        .done(function () {
          props();
        })
        .fail(function () {
          transition.redirect('login', params);
          props();
        });
    }
  }
};
