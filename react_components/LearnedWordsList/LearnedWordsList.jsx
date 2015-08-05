var React = require('react');
module.exports = React.createClass({
  render: function () {
    return (
      <table className="table">
        <thead>
        <tr>
          <th>Слово</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Hello</td>
        </tr>
        <tr>
          <td>World</td>
        </tr>
        <tr>
          <td>Citizen</td>
        </tr>
        </tbody>
      </table>
    );
  }
});