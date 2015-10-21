var auth = require('../../modules/auth');


module.exports = {
  statics: {
    willTransitionTo: function (transition, params, query, props) {
      auth.isLoggedIn()
        .then(function () {
          transition.redirect('app', params);
          props();
        })
        .catch(function () {
          props();
        });
    }
  }
};
