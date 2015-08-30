var React = require('react');
var api = require('../../modules/api');

module.exports = React.createClass({
  loadCard: function () {
    var id = this.props.params.id;
    return parseInt(id, 10) ? api.card.get(id) : api.card.get({text: id}).then(function(response) {
      return response.results[0] || {};
    });
  },

  getInitialState: function () {
    return {card: {}};
  },

  componentDidMount: function () {
    this.loadCard().then(function(card) {
      this.setState({
        card: card
      });
    }.bind(this)).catch(function() {});
  },

  render: function () {
    return (
      <div>
        CardView {JSON.stringify(this.state.card)}
      </div>
    );
  }
});
