var React = require('react');
var Router = require('react-router');


module.exports = React.createClass({

    getClassName: function () {
        return 'btn ' + this.props.className;
    },

    render: function () {
        return <button type={this.props.type} disabled={this.props.disabled} onClick={this.props.onClick}
                       className={this.getClassName()}>{this.props.buttonText}</button>
    }

});
