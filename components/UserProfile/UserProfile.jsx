var React = require('react');
var t = require('../../modules/t');
var auth = require('../../modules/auth');

module.exports = React.createClass({
  render: function () {
    var userInfo = auth.getUserInfo();
    return (
      <form>
        <div className="form-group">
          <label>{t('Username')}</label>

          <p className="form-control-static">{userInfo.username}</p>
        </div>
        <div className="form-group">
          <label>{t('Email')}</label>

          <p className="form-control-static">{userInfo.email}</p>
        </div>
      </form>
    );
  }
});