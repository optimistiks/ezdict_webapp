global.jQuery = require('jquery');
require('bootstrap');
var React = require('react');
var Router = require('react-router');
var i18n = require('./modules/i18n');
var routes = require('./modules/routes/routes.jsx');

Router.run(routes, function (Handler, state) {
  i18n.setLng(state.params.lng, function () {
    React.render(<Handler/>, document.getElementById('content'));
  });
});
