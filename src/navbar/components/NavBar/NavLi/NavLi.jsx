var React = require('react');
var Router = require('react-router');

var Link = require('../../../../common/components/Link/Link.jsx');


module.exports = React.createClass({

    contextTypes: {
        location: React.PropTypes.object,
        history: React.PropTypes.object
    },

    render: function () {

        var isActive = this.context.history.isActive(this.context.location.pathname, this.context.location.query);
        var className = isActive ? 'active' : '';
        var link = (
            <Link {...this.props} />
        );

        return <li className={className}>{link}</li>;

    }

});
