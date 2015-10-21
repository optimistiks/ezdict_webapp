var auth = require('../../modules/auth');


module.exports = {
  statics: {
    willTransitionTo: function (transition, params, query, props) {
      auth.isLoggedIn()
        .then(function () {
          props();
        })
        .catch(function () {
          transition.redirect('login', params);
          props();
        });
    }
  }
};
