var React = require('react');
var t = require('../../modules/t');
var api = require('../../modules/api');
var moment = require('moment');

module.exports = React.createClass({

  next: 1,

  loadHistories: function () {
    api.getTranslationHistory(this.next)
      .then(function (response) {
        if (!this.isMounted()) {
          return false;
        }

        if (response.next) {
          ++this.next;
        } else {
          this.next = null;
        }

        this.setState({
          histories: this.state.histories.concat(response.results)
        });
      }.bind(this)).catch(function() {});
  },

  getInitialState: function () {
    return {histories: []};
  },

  componentDidMount: function () {
    this.loadHistories();
  },

  render: function () {

    var historyNodes = this.state.histories.map(function (history) {
      return (
        <li>
          <ul className="list-inline">
            <li>{history.string}</li>
            <li><span className="label label-success">{moment(history.updated).format('DD.MM.YYYY HH:mm')}</span></li>
            <li><span className="label label-info">{history.count}</span></li>
          </ul>
        </li>
      );
    });

    var moreButton = this.next ?
      <button type="button" className="btn btn-default btn-block" onClick={this.loadHistories}>{t('More')}</button>
      : undefined;

    return (
      <div>
        <ul className="list-unstyled">
          {historyNodes}
        </ul>
        {moreButton}
      </div>
    );
  }
});
