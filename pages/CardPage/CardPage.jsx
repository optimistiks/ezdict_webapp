var React = require('react');
var AuthCheck = require('../../mixins/AuthCheck');
var CardList = require('../../components/CardList/CardList.jsx');
module.exports = React.createClass({
  mixins: [AuthCheck],
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-12">
          <CardList/>
        </div>
      </div>
    );
  }
});
