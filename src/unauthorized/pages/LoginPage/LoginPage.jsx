var React = require('react');

var LoginForm = require('../../../unauthorized/components/LoginForm/LoginForm.jsx');


module.exports = React.createClass({

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-offset-4 col-sm-4">
                    <LoginForm />
                </div>
            </div>
        );
    }
});
