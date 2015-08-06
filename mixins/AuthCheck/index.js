var isLoggedIn = false;
module.exports = {
  statics: {
    willTransitionTo: function (transition) {
      if (!isLoggedIn) {
        transition.redirect('login');
      }
    }
  }
};
