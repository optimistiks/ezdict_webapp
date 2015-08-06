var React = require('react');
var t = require('../../modules/t');
module.exports = React.createClass({
  render: function () {
    var historyNodes = this.props.histories.map(function (history) {
      return (
        <li>
          <ul className="list-inline">
            <li>{history.word}</li>
            <li><span className="label label-success">{history.date}</span></li>
            <li><span className="label label-info">{history.count}</span></li>
          </ul>
        </li>
      );
    });
    return (
      <ul className="list-unstyled">
        {historyNodes}
      </ul>
    );
  }
});
