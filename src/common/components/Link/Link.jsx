var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var routeParamsStore = require('../../modules/route-params-store');


module.exports = React.createClass({

    getInitialState () {
        return {lng: routeParamsStore.getLng()}
    },

    componentWillMount () {
        routeParamsStore.on('change', this.handleRouteParamsChange);
    },

    componentWillUnmount: function () {
        routeParamsStore.removeListener('change', this.handleRouteParamsChange);
    },

    handleRouteParamsChange () {
        if (this.state.lng !== routeParamsStore.getLng()) {
            this.setState({
                lng: routeParamsStore.getLng()
            });
        }
    },

    render: function () {

        var to = '/' + (this.props.lng || this.state.lng) + '/' + this.props.to;
        return <Link {...this.props} to={to}/>;

    }

});
