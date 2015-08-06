global.jQuery = require('jquery');
require('bootstrap');
var React = require('react');
var Router = require('react-router');
var i18n = require('./modules/i18n');
var routes = require('./modules/routes/routes.jsx');

i18n.setLng('ru', function() {
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
  });
});
