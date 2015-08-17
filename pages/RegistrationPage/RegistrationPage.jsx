var React = require('react');
var NonAuthCheck = require('../../mixins/NonAuthCheck');
var RegistrationForm = require('../../components/RegistrationForm/RegistrationForm.jsx');
module.exports = React.createClass({

  mixins: [NonAuthCheck],

  render: function () {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-offset-4 col-sm-4">
          <RegistrationForm />
        </div>
      </div>
    );
  }
});
