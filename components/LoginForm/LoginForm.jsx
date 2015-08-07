var React = require('react');
var t = require('../../modules/t');
module.exports = React.createClass({
  render: function () {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label for="inputEmail3" className="col-xs-4 control-label">{t('Username')}</label>

          <div className="col-xs-8">
            <input type="email" className="form-control" id="inputEmail3" placeholder={t('Username')}/>
          </div>
        </div>
        <div className="form-group">
          <label for="inputPassword3" className="col-xs-4 control-label">{t('Password')}</label>

          <div className="col-xs-8">
            <input type="password" className="form-control" id="inputPassword3" placeholder={t('Password')}/>
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
