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
            transition({nextPathname: nextState.location.pathname}, '/:lng/login'.replace(':lng', nextState.params.lng));
            callback();
        });
};
var checkIsNotLoggedIn = function(nextState, transition, callback) {
    auth.isLoggedIn()
        .then(function () {
            transition({nextPathname: nextState.location.pathname}, '/:lng/card'.replace(':lng', nextState.params.lng));
            callback();
        })
        .catch(function () {
            callback();
        });
};


var routes = (
    <Router>
        <Route path="/">
            <Route path=":lng" component={App}>
                <Route onEnter={checkIsNotLoggedIn}>
                    <Route path="login" component={LoginPage}/>
                    <Route path="register" component={RegistrationPage}/>
                    <Route path="promo" component={PromoPage}/>
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
