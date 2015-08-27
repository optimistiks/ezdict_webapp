var React = require('react');
module.exports = React.createClass({
  render: function () {
    return (
      <div>
        CardView {this.props.params.id}
      </div>
    );
  }
});
