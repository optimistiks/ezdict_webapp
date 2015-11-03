global.jQuery = require('jquery');

require('bootstrap');
require('./src/common/modules/ya-metrika');

var React = require('react');
var ReactDOM = require('react-dom');

var routes = require('./src/common/modules/routes/routes.jsx');

ReactDOM.render(routes, document.getElementById('content'));
