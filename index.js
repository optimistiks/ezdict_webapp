global.jQuery = require('jquery');

require('bootstrap');
require('./src/common/modules/ya-metrika');

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;

var i18n = require('./src/common/modules/i18n');
var routes = require('./src/common/modules/routes/routes.jsx');
var config = require('./config');
var api = require('./src/common/modules/api');


ReactDOM.render(routes, document.getElementById('content'));


/*
var render = function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
};

Router.run(routes, function (Handler, state) {
    api.config.setLocale(state.params.lng);
    if (state.params.lng !== i18n.lng() && config.supportedLngs.indexOf(state.params.lng) !== -1) {
        i18n.setLng(state.params.lng, function () {
            render(Handler);
        });
    } else {
        render(Handler);
    }
});
*/
