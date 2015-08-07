var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;
var NavLi = require('../NavLi/NavLi.jsx');
var t = require('../../../modules/t');
var auth = require('../../../modules/auth');

module.exports = React.createClass({

  mixins: [Navigation],

  signOut: function (e) {
    e.preventDefault();
    auth.logout()
      .done(function () {
        this.transitionTo('login');
      }.bind(this));
  },

  render: function () {
    return (
      <div className="collapse navbar-collapse" id="navbar-collapse">
        <ul className="nav navbar-nav">
          <NavLi to="history">{t('Translation history')}</NavLi>
          <NavLi to="learning">{t('Words to learn')}</NavLi>
          <NavLi to="learned">{t('Learned words')}</NavLi>
          <NavLi to="my-articles">{t('My translations')}</NavLi>
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
