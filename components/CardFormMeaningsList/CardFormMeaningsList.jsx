var React = require('react');
var api = require('../../modules/api');
var eventEmitter = require('../../modules/event-emitter');


module.exports = React.createClass({
    getInitialState: function () {
        return {meanings: []};
    },

    componentWillMount: function () {
        var ringBell = function () {
            console.log('ring ring ring');
        };
        eventEmitter.on('doorOpen', ringBell);
    },

    componentDidMount: function () {
        if (!this.props.card.id) {
            return;
        }

        this.loadMeaningsAndUpdateState(this.props.card);
    },

    componentWillReceiveProps: function (nextProps) {
        if (!nextProps.card.id) {
            this.setState({
                meanings: []
            });
            return;
        }

        if (this.props.card.id === nextProps.card.id) {
            return;
        }

        this.loadMeaningsAndUpdateState(nextProps.card);
    },

    loadMeanings: function (card) {
        return api.cardMeaning.get({card: card.id});
    },

    loadMeaningsAndUpdateState: function (card) {
        this.loadMeanings(card).then(function (response) {
            this.setState({
                meanings: response.results
            });
        }.bind(this));
    },

    render: function () {

        var meaningsList = null;

        if (this.state.meanings.length) {
            let meaningNodes = this.state.meanings.map(function (meaning) {
                return (
                    <a href="#" className="list-group-item">{meaning.text}</a>
                );
            });

            meaningsList = (
                <div className="form-group">
                    <label htmlFor="text">Значения</label>
                    <ul className="list-group">
                        {meaningNodes}
                    </ul>
                </div>
            );
        }

        return meaningsList;
    }
});