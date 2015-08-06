var React = require('react');
var t = require('../../app_modules/t');
module.exports = React.createClass({
  render: function () {
    return (
      <ul className="list-unstyled">
        <li>
          <ul className="list-inline">
            <li>hello</li>
            <li><span className="label label-success">25.06.2012 15:03</span></li>
            <li><span className="label label-info">1</span></li>
          </ul>
        </li>
        <li>
          <ul className="list-inline">
            <li>hellos</li>
            <li><span className="label label-success">25.06.2012 15:03</span></li>
            <li><span className="label label-info">1</span></li>
          </ul>
        </li>
        <li>
          <ul className="list-inline">
            <li>hello</li>
            <li><span className="label label-success">25.06.2012 15:03</span></li>
            <li><span className="label label-info">1</span></li>
          </ul>
        </li>
      </ul>
    );
  }
});