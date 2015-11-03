var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var Redirect = ReactRouter.Redirect;
var Route = ReactRouter.Route;

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
var auth = require('../../modules/auth');
var api = require('../../modules/api');
var i18n = require('../../modules/i18n');
var routeParamsStore = require('../route-params-store');

/**
 * "/" => "/defaultLng"
 */
//todo

/**
 * "/not/found/route" => "/defaultLng/not/found/route"
 */
//todo

var checkIsLoggedIn = function(nextState, transition, callback) {
    auth.isLoggedIn()
        .then(function () {
            callback();
        })
        .catch(function () {
            var newPath = '/:lng/login'.replace(':lng', nextState.params.lng || routeParamsStore.getLng());
            transition({nextPathname: nextState.location.pathname}, newPath);
            callback();
        });
};
var checkIsNotLoggedIn = function(nextState, transition, callback) {
    auth.isLoggedIn()
        .then(function () {
            var newPath = '/:lng/card'.replace(':lng', nextState.params.lng || routeParamsStore.getLng());
            transition({nextPathname: nextState.location.pathname}, newPath);
            callback();
        })
        .catch(function () {
            callback();
        });
};

var prepareI18n = function(nextState, transition, callback) {

    api.config.setLocale(nextState.params.lng);
    i18n.setLng(nextState.params.lng, function () {
        callback();
    });

};


var routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={RegistrationPage} onEnter={checkIsNotLoggedIn}/>
            <Route path=":lng" onEnter={prepareI18n}>
                <IndexRoute component={RegistrationPage} onEnter={checkIsNotLoggedIn}/>
                <Route onEnter={checkIsNotLoggedIn}>
                    <Route path="login" component={LoginPage}/>
                    <Route path="register" component={RegistrationPage}/>
                </Route>
                <Route onEnter={checkIsLoggedIn}>
                    <Route path="history" component={TranslationHistoryPage}/>
                    <Route path="quiz" component={QuizPage}/>
                    <Route path="quiz/:id" component={QuizFormPage}/>
                    <Route path="card" component={CardPage}/>
                    <Route path="card/:id" component={CardFormPage}/>
                    <Route path="profile" component={UserProfilePage}/>
                </Route>
            </Route>
        </Route>
    </Router>
);

module.exports = routes;
