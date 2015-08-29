global.jQuery = require('jquery');
require('bootstrap');
var React = require('react');
var Router = require('react-router');
var i18n = require('./modules/i18n');
var routes = require('./modules/routes/routes.jsx');

var render = function(Handler) {
  React.render(<Handler/>, document.getElementById('content'));
};

Router.run(routes, function (Handler, state) {
  if (state.params.lng !== i18n.lng()) {
    i18n.setLng(state.params.lng, function () {
      render(Handler);
    });
  } else {
    render(Handler);
  }
});
