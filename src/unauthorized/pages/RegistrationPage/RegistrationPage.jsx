var React = require('react');

var RegistrationForm = require('../../../unauthorized/components/RegistrationForm/RegistrationForm.jsx');


module.exports = React.createClass({

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
