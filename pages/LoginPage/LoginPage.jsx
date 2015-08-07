var React = require('react');
var auth = require('../../modules/auth');
var LoginForm = require('../../components/LoginForm/LoginForm.jsx');
module.exports = React.createClass({
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
  },

  render: function () {
    return (
      <div className="row">
        <div className="col-xs-offset-3 col-xs-6">
          <LoginForm />
        </div>
      </div>
    );
  }
});
