var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var TranslationHistoryPage= require('../../react_pages/TranslationHistoryPage/TranslationHistoryPage.jsx');
var LearningWordsPage = require('../../react_pages/LearningWordsPage/LearningWordsPage.jsx');
var LearnedWordsPage = require('../../react_pages/LearnedWordsPage/LearnedWordsPage.jsx');
var MyArticlesPage = require('../../react_pages/MyArticlesPage/MyArticlesPage.jsx');
var App = require('../../react_components/App/App.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="history" handler={TranslationHistoryPage} />
    <Route name="learning" handler={LearningWordsPage} />
    <Route name="learned" handler={LearnedWordsPage} />
    <Route name="my-articles" handler={MyArticlesPage} />
    <Route name="profile" handler={LearningWordsPage} />
    <Redirect from="/" to="history" />
  </Route>
);

module.exports = routes;
