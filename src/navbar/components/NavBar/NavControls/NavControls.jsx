var React = require('react');
var Router = require('react-router');
var History = Router.History;

var Link = require('../../../../common/components/Link/Link.jsx');
var NavLi = require('../NavLi/NavLi.jsx');
var t = require('../../../../common/modules/t');
var auth = require('../../../../common/modules/auth');


module.exports = React.createClass({

    mixins: [History],

    signOut: function (e) {
        e.preventDefault();
        auth.logout()
            .then(function () {
                this.history.pushState(null, '/' + this.props.lng + '/login');
            }.bind(this)).catch(function (exception) {
            console.error(exception);
        });
    },

    render: function () {
        return (
            <div>
                <ul className="nav navbar-nav">
                    <NavLi to="quiz" lng={this.props.lng}>{t('linkToQuizzesSectionText')}</NavLi>
                    <NavLi to="card" lng={this.props.lng}>{t('Cards')}</NavLi>
                    <NavLi to="history" lng={this.props.lng}>{t('Translation history')}</NavLi>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-haspopup="true"
                           aria-expanded="false">{this.props.userInfo.username} <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <NavLi to="profile" lng={this.props.lng}>{t('Profile')}</NavLi>
                            <li role="separator" className="divider"></li>
                            <li><a href="#" onClick={this.signOut}>{t('Sign out')}</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
});
