var React = require('react');
var AuthCheck = require('../../mixins/AuthCheck');
var CardForm = require('../../components/CardForm/CardForm.jsx');

module.exports = React.createClass({
  mixins: [AuthCheck],
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-6">
          <CardForm params={this.props.params}/>
        </div>
      </div>
    );
  }
});
