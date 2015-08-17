var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var State = Router.State;

module.exports = React.createClass({

  mixins: [State],

  render: function () {
    var params = this.props.params || {};
    var routeParams = this.getParams();

    Object.keys(routeParams).forEach(function (key) {
      // if param is not explicitly set, use param from route
      if (!params[key]) {
        params[key] = routeParams[key];
      }
    }.bind(this));

    return <Link {...this.props} params={params} />;
  }

});
