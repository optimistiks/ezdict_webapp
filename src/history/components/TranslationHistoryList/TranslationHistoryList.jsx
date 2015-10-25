var React = require('react');
var moment = require('moment');

var t = require('../../../common/modules/t');
var api = require('../../../common/modules/api');

var historyStore = require('../../modules/history-store');
var historyActions = require('../../modules/history-actions');

module.exports = React.createClass({

    getInitialState: function () {
        return {histories: historyStore.getAll()};
    },

    historyChanged () {
        this.setState({histories: historyStore.getAll()});
    },

    componentDidMount: function () {
        historyStore.on('change', this.historyChanged);
        historyActions.load();
    },

    componentWillUnmount: function () {
        historyStore.removeListener('change', this.historyChanged);
    },

    render: function () {

        var historyNodes = this.state.histories.map(function (history) {
            return (
                <li key={history.id}>
                    <ul className="list-inline">
                        <li>{history.string}</li>
                        <li><span
                            className="label label-success">{moment(history.updated).format('DD.MM.YYYY HH:mm')}</span>
                        </li>
                        <li><span className="label label-info">{history.count}</span></li>
                    </ul>
                </li>
            );
        });

        var moreButton = historyStore.getPage() ?
            <button type="button" className="btn btn-default btn-block"
                    onClick={historyActions.load}>{t('More')}</button>
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
