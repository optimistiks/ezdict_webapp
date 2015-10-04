var React = require('react');
var Router = require('react-router');

var Link = require('../../../common/components/Link/Link.jsx');
var NavLi = require('./NavLi/NavLi.jsx');
var NavControls = require('./NavControls/NavControls.jsx');
var LanguageSwitcher = require('./LanguageSwitcher/LanguageSwitcher.jsx');

var auth = require('../../../common/modules/auth');


module.exports = React.createClass({
    render: function () {
        var controls;
        if (auth.getUserInfo()) {
            controls = <NavControls userInfo={auth.getUserInfo()}/>;
        }
        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar-collapse"
                            aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="history">Wordix</Link>
                </div>

                <div className="collapse navbar-collapse" id="navbar-collapse">
                    {controls}
                    <LanguageSwitcher />
                </div>
            </nav>
        );
    }
});
