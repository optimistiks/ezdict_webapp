var React = require('react');
var NavBar = require('../NavBar/NavBar.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
module.exports = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <NavBar/>
        <RouteHandler/>
      </div>
    );
  }
});
