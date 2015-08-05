global.jQuery = require('jquery');
require('bootstrap');
var React = require('react');
var Router = require('react-router');
var i18n = require('./app_modules/i18n');
var routes = require('./app_modules/routes/routes.jsx');

i18n.setLng('ru', function() {
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
  });
});
