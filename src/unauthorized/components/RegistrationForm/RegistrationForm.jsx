var $ = require('jquery');
var React = require('react');
var Router = require('react-router');
var History = Router.History;

var Link = require('../../../common/components/Link/Link.jsx');
var auth = require('../../../common/modules/auth');
var t = require('../../../common/modules/t');
var Form = require('../../../common/mixins/Form');
var appEventEmitter = require('../../../common/modules/event-emitter');
var metrika = require('../../../common/modules/ya-metrika');
var stateParamsStore = require('../../../common/modules/route-params-store');


module.exports = React.createClass({

    mixins: [History, Form],

    handleSubmit: function (e) {
        e.preventDefault();
        var formData = this.serializeAsKeyValue();
        auth.register(formData)
            .then(function () {
                metrika.reachGoal('REGISTRATION');
                this.history.pushState(null, '/:lng/card'.replace(':lng', stateParamsStore.getLng()));
            }.bind(this)).catch(function (exception) {
            appEventEmitter.emitRequestException(exception);
        }.bind(this));
    },

    getInitialState: function () {
        return {errors: {}};
    },

    render: function () {

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">{t('Username')}</label>
                    <input required type="text" className="form-control" id="username" placeholder={t('Username')}
                           name="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">{t('Email')}</label>
                    <input required type="email" className="form-control" id="email" placeholder={t('Email')}
                           name="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">{t('Password')}</label>
                    <input required type="password" className="form-control" id="password" placeholder={t('Password')}
                           name="password"/>
                </div>
                <button type="submit" className="btn btn-success">{t('Register')}</button>
                <Link className="pull-right" to="login">{t('Sign in')}</Link>
            </form>
        );
    }
});
