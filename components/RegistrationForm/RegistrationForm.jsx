var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;
var Link = require('../Link/Link.jsx');
var auth = require('../../modules/auth');
var t = require('../../modules/t');
var $ = require('jquery');
var Form = require('../../mixins/Form');

module.exports = React.createClass({

  mixins: [Navigation, State, Form],

  handleSubmit: function (e) {
    e.preventDefault();
    var formData = this.serializeAsKeyValue();
    auth.register(formData)
      .then(function () {
        this.transitionTo('app', this.getParams());
      }.bind(this)).catch(function (errors) {
        this.setState({errors: errors});
      }.bind(this));
  },

  getInitialState: function () {
    return {errors: {}};
  },

  render: function () {
    var errors = [];

    Object.keys(this.state.errors).forEach(function (key) {
      errors.push(this.state.errors[key]);
    }.bind(this));

    var errorNodes = errors.map(function (error) {
      return (
        <p className="text-danger">{error}</p>
      );
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-xs-12 text-center">
            {errorNodes}
          </div>
        </div>
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
