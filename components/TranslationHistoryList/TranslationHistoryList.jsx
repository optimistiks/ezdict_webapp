var React = require('react');
module.exports = React.createClass({
  render: function () {
    return (
      <table className="table">
        <thead>
        <tr>
          <th>Текст</th>
          <th>Сколько раз искали</th>
          <th>Когда искали последний раз</th>
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