var React = require('react');
var Router = require('react-router');
var NavLi = require('../NavLi/NavLi.jsx');

module.exports = React.createClass({
  render: function () {
    return (
      <ul className="nav navbar-nav pull-right">
        <NavLi to="app" params={{lng: 'ru'}}>RU</NavLi>
        <NavLi to="app" params={{lng: 'en'}}>EN</NavLi>
      </ul>
    );
  }
});
