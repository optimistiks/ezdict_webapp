var React = require('react');
var NonAuthCheck = require('../../mixins/NonAuthCheck');
var LoginForm = require('../../components/LoginForm/LoginForm.jsx');
module.exports = React.createClass({
  mixins: [NonAuthCheck],

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