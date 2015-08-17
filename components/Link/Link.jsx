var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var State = Router.State;

module.exports = React.createClass({

  mixins: [ State ],

  render: function () {
    return <Link {...this.props} params={this.getParams()} />;
  }

});
