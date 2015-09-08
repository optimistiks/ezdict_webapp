var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var TranslationHistoryPage = require('../../../history/pages/TranslationHistoryPage/TranslationHistoryPage.jsx');
var LearningWordsPage = require('../../../word/pages/LearningWordsPage/LearningWordsPage.jsx');
var LearnedWordsPage = require('../../../word/pages/LearnedWordsPage/LearnedWordsPage.jsx');
var CardPage = require('../../../card/pages/CardPage/CardPage.jsx');
var CardFormPage = require('../../../card/pages/CardFormPage/CardFormPage.jsx');
var UserProfilePage = require('../../../profile/pages/UserProfilePage/UserProfilePage.jsx');
var LoginPage = require('../../../unauthorized/pages/LoginPage/LoginPage.jsx');
var RegistrationPage = require('../../../unauthorized/pages/RegistrationPage/RegistrationPage.jsx');
var App = require('../../../common/components/App/App.jsx');

var config = require('../../../../config');

/**
 * "/" => "/defaultLng"
 */
var RedirectToDefaultLng = React.createClass({
    statics: {
        willTransitionTo (transition, params) {
            transition.redirect('app', {lng: config.defaultLng});
        }
    },
    render: function () {
        return null;
    }
});

/**
 * "/not/found/route" => "/defaultLng/not/found/route"
 */
var NotFoundRouteHandler = React.createClass({
    statics: {
        willTransitionTo (transition, params) {
            if (config.supportedLngs.indexOf(params.lng) === -1) {
                var newPath = '/' + config.defaultLng + transition.path;
                transition.redirect(newPath);
            }
        }
    },
    render: function () {
        return null;
    }
});

var routes = (
    <Route path="/">
        <DefaultRoute handler={RedirectToDefaultLng}/>
        <Route name="app" path=":lng" handler={App}>
            <Route name="history" handler={TranslationHistoryPage}/>
            <Route name="learning" handler={LearningWordsPage}/>
            <Route name="learned" handler={LearnedWordsPage}/>
            <Route name="card" handler={CardPage}/>
            <Route name="card-form" path="card/:id" handler={CardFormPage}/>
            <Route name="profile" handler={UserProfilePage}/>
            <Route name="login" handler={LoginPage}/>
            <Route name="register" handler={RegistrationPage}/>
            <Redirect from="/:lng" to="history"/>
            <NotFoundRoute handler={NotFoundRouteHandler}/>
        </Route>
    </Route>
);

module.exports = routes;
