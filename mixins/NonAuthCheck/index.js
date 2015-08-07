var auth = require('../../modules/auth');
module.exports = {
  statics: {
    willTransitionTo: function (transition, params, query, props) {
      auth.isLoggedIn()
        .done(function () {
          transition.redirect('/');
          props();
        })
        .fail(function () {
          props();
        });
    }
  }
};
