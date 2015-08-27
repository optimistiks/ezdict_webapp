var React = require('react');
var AuthCheck = require('../../mixins/AuthCheck');
var CardView = require('../../components/CardView/CardView.jsx');

module.exports = React.createClass({
  mixins: [AuthCheck],
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-12">
          <CardView params={this.props.params}/>
        </div>
      </div>
    );
  }
});
