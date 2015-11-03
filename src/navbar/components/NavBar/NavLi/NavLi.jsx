var React = require('react');
var Router = require('react-router');

var Link = require('../../../../common/components/Link/Link.jsx');

var routeParamsStore = require('../../../../common/modules/route-params-store');


module.exports = React.createClass({

    contextTypes: {
        location: React.PropTypes.object,
        history: React.PropTypes.object
    },

    render: function () {

        var to = '/' + this.props.lng + '/' + this.props.to;

        var isActive = this.context.history.isActive(to);
        var className = isActive ? 'active' : '';
        var link = (
            <Link {...this.props} lng={this.props.lng} />
        );

        return <li className={className}>{link}</li>;

    }

});
