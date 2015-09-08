var auth = require('../../modules/auth');


module.exports = {
  statics: {
    willTransitionTo: function (transition, params, query, props) {
      auth.isLoggedIn()
        .done(function () {
          transition.redirect('app', params);
          props();
        })
        .fail(function () {
          props();
        });
    }
  }
};
