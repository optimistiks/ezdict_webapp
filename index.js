require('babel/register');
global.jQuery = require('jquery');
global.i18n = require('i18next-client');

global.React = require('react');
global.Router = require('react-router');

require('jquery-slimscroll');
require('bootstrap');

require('./routing/routing.jsx');

jQuery(function () {
  console.log(jQuery.fn.slimscroll);
});
