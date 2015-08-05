var React = require('react');
var t = require('../../app_modules/t');
module.exports = React.createClass({
  render: function () {
    return (
      <table className="table">
        <thead>
        <tr>
          <th>{t('Text')}</th>
          <th>{t('Translation count')}</th>
          <th>{t('Last translation date')}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Hello</td>
          <td>1</td>
          <td>27.02.2012 12:30</td>
        </tr>
        <tr>
          <td>World</td>
          <td>3</td>
          <td>27.02.2012 12:30</td>
        </tr>
        <tr>
          <td>Citizen</td>
          <td>7</td>
          <td>27.02.2012 12:30</td>
        </tr>
        </tbody>
      </table>
    );
  }
});