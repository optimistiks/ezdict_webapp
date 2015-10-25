var React = require('react');

var Router = require('react-router');
var IndexRoute = Router.IndexRoute;
var Redirect = Router.Redirect;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var TranslationHistoryPage = require('../../../history/pages/TranslationHistoryPage/TranslationHistoryPage.jsx');
var QuizPage = require('../../../quiz/pages/QuizPage/QuizPage.jsx');
var QuizFormPage = require('../../../quiz/pages/QuizFormPage/QuizFormPage.jsx');
var CardPage = require('../../../card/pages/CardPage/CardPage.jsx');
var CardFormPage = require('../../../card/pages/CardFormPage/CardFormPage.jsx');
var UserProfilePage = require('../../../profile/pages/UserProfilePage/UserProfilePage.jsx');
var LoginPage = require('../../../unauthorized/pages/LoginPage/LoginPage.jsx');
var RegistrationPage = require('../../../unauthorized/pages/RegistrationPage/RegistrationPage.jsx');
var PromoPage = require('../../../unauthorized/pages/PromoPage/PromoPage.jsx');
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
        <IndexRoute component={RedirectToDefaultLng}/>
        <Route path=":lng" component={App}>
            <Route path="history" component={TranslationHistoryPage}/>
            <Route path="quiz" component={QuizPage}/>
            <Route path="quiz/:id" component={QuizFormPage}/>
            <Route path="card" component={CardPage}/>
            <Route path="card/:id" component={CardFormPage}/>
            <Route path="profile" component={UserProfilePage}/>
            <Route path="login" component={LoginPage}/>
            <Route path="register" component={RegistrationPage}/>
            <Route path="promo" component={PromoPage}/>
            <Redirect from="/:lng" to="card"/>
            <Route path="*" component={NotFoundRouteHandler}/>
        </Route>
    </Route>
);

module.exports = routes;
