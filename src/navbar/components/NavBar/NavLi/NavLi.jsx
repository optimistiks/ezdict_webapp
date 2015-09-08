var React = require('react');
var Router = require('react-router');
var State = Router.State;

var Link = require('../../../../common/components/Link/Link.jsx');


module.exports = React.createClass({

    mixins: [State],

    render: function () {
        var isActive = this.isActive(this.props.to, this.props.params, this.props.query);
        var className = isActive ? 'active' : '';
        var link = (
            <Link {...this.props} />
        );
        return <li className={className}>{link}</li>;
    }

});
