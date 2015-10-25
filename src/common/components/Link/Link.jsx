var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var routeParamsStore = require('../../modules/route-params-store');


module.exports = React.createClass({

    getInitialState () {
        return {routeParams: routeParamsStore.getParams()}
    },

    componentWillMount () {
        routeParamsStore.on('change', this.handleRouteParamsChange);
        console.log('Link componentWillMount');
    },

    componentWillUnmount: function () {
        console.log('Link componentWillUnMount');
        routeParamsStore.removeListener('change', this.handleRouteParamsChange);
    },

    handleRouteParamsChange () {
        this.setState({
            routeParams: routeParamsStore.getParams()
        });
    },

    render: function () {
        var params = this.props.params || {};
        var routeParams = routeParamsStore.getParams();

        Object.keys(routeParams).forEach(function (key) {
            // if param is not explicitly set, use param from route
            if (!params[key]) {
                params[key] = routeParams[key];
            }
        }.bind(this));

        return <Link {...this.props} params={params}/>;
    }

});
