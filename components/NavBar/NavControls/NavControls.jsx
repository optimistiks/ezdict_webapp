var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;
var Link = require('../../Link/Link.jsx');
var NavLi = require('../NavLi/NavLi.jsx');
var t = require('../../../modules/t');
var auth = require('../../../modules/auth');

module.exports = React.createClass({

  mixins: [Navigation, State],

  signOut: function (e) {
    e.preventDefault();
    auth.logout()
      .done(function () {
        this.transitionTo('login', this.getParams());
      }.bind(this));
  },

  render: function () {
    return (
      <div>
        <ul className="nav navbar-nav">
          <NavLi to="learning">{t('Words to learn')}</NavLi>
          <NavLi to="learned">{t('Learned words')}</NavLi>
          <NavLi to="card">{t('Cards')}</NavLi>
          <NavLi to="history">{t('Translation history')}</NavLi>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
               aria-expanded="false">{this.props.userInfo.username} <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <NavLi to="profile">{t('Profile')}</NavLi>
              <li role="separator" className="divider"></li>
              <li><a href="#" onClick={this.signOut}>{t('Sign out')}</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});
