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
        <div className="col-xs-offset-4 col-xs-4">
          <LoginForm />
        </div>
      </div>
    );
  }
});