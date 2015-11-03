var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var routeParamsStore = require('../../modules/route-params-store');
var config = require('../../../../config');


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

    getLng () {

        // if lng is passed via props, use it
        if (this.props.lng) return this.props.lng;

        //otherwise, get lng from route params
        if (this.state.lng) return this.state.lng;

        //and if we are in root route, return default lng
        return config.defaultLng;

    },

    render: function () {

        var to = '/' + this.getLng() + '/' + this.props.to;
        return <Link {...this.props} to={to}/>;

    }

});
