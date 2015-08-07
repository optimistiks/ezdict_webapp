var React = require('react');
var Navigation = require('react-router').Navigation;
var auth = require('../../modules/auth');
var t = require('../../modules/t');
var $ = require('jquery');

module.exports = React.createClass({

  mixins: [Navigation],

  handleSubmit: function (e) {
    e.preventDefault();
    var formData = $(this.getDOMNode()).serializeArray();
    auth.login(formData)
      .done(function () {
        this.transitionTo('history');
      }.bind(this)).fail(function (errors) {
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
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-xs-12 text-center">
            {errorNodes}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username" className="col-xs-4 control-label">{t('Username')}</label>

          <div className="col-xs-8">
            <input required type="text" className="form-control" id="username" placeholder={t('Username')}
                   name="username"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="col-xs-4 control-label">{t('Password')}</label>

          <div className="col-xs-8">
            <input required type="password" className="form-control" id="password" placeholder={t('Password')}
                   name="password"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-offset-4 col-xs-8">
            <button type="submit" className="btn btn-success">{t('Sign in')}</button>
          </div>
        </div>
      </form>
    );
  }
});
