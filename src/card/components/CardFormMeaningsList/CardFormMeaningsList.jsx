var React = require('react');

var api = require('../../../common/modules/api');
var cardEventEmitter = require('../../modules/event-emitter');


module.exports = React.createClass({

    componentWillMount: function () {
        cardEventEmitter.onPossibleMeaningClick(this.addMeaningFromPossibleMeanings);
    },

    addMeaningFromPossibleMeanings: function (meaningText) {
        console.log('addMeaningFromPossibleMeanings', meaningText);
        var card = this.props.card;
        var meaningModel = this.wrapMeaningText(meaningText);
        card.card_meanings.push(meaningModel);
        this.props.handleChange(card);
    },

    wrapMeaningText: function (text) {
        return {
            text: text
        };
    },

    handleDelete: function (index, event) {
        event.preventDefault();
        var card = this.props.card;
        var deleted = card.card_meanings.splice(index, 1);
        console.log('handleDelete', deleted);
        if (deleted.length && deleted[0].id) {
            this.props.handleMeaningDelete(deleted[0]);
        }
        this.props.handleChange(card);
    },

    render: function () {

        var meaningsList = null;

        if (this.props.card.card_meanings.length) {
            let meaningNodes = this.props.card.card_meanings.map(function (meaning, index) {
                var boundDelete = this.handleDelete.bind(this, index);
                return (
                    <a href="#" className="list-group-item" onClick={boundDelete}>{meaning.text}</a>
                );
            }.bind(this));

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