var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var NavBar = require('../../react_components/NavBar/NavBar.jsx');
var TranslationHistoryList = require('../../react_components/TranslationHistoryList/TranslationHistoryList.jsx');
var LearningWordsList = require('../../react_components/LearningWordsList/LearningWordsList.jsx');
var LearnedWordsList = require('../../react_components/LearnedWordsList/LearnedWordsList.jsx');
var MyArticles = require('../../react_components/MyArticlesList/MyArticlesList.jsx');
var Profile = require('../../react_components/UserProfile/UserProfile.jsx');
var App = require('../../react_components/App/App.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="history" handler={TranslationHistoryList} />
    <Route name="learning" handler={LearningWordsList} />
    <Route name="learned" handler={LearnedWordsList} />
    <Route name="my-articles" handler={MyArticles} />
    <Route name="profile" handler={Profile} />
    <Redirect from="/" to="history" />
  </Route>
);

module.exports = routes;
