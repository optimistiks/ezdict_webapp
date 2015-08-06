var React = require('react');
var t = require('../../modules/t');
module.exports = React.createClass({
  render: function () {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-xs-6 control-label">{t('Username')}</label>

          <div className="col-xs-6">
            <p className="form-control-static">optimistiks</p>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-6 control-label">{t('Email')}</label>

          <div className="col-xs-6">
            <p className="form-control-static">email@example.com</p>
          </div>
        </div>
      </form>
    );
  }
});