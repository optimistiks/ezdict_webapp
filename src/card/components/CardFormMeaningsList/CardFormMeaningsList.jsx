var React = require('react');

var api = require('../../../common/modules/api');
var cardEventEmitter = require('../../modules/event-emitter');


module.exports = React.createClass({

    handleClick: function (index, event) {
        event.preventDefault();
        var cardMeanings = this.props.meanings;
        var clickedMeaning = cardMeanings[index];
        cardMeanings.splice(index, 1);
        this.props.handleMeaningsChange(cardMeanings);
        if (clickedMeaning.id) {
            this.props.handleMeaningDeletion(clickedMeaning);
        }
    },

    render: function () {

        var meaningsList = null;

        if (this.props.meanings.length) {
            let meaningNodes = this.props.meanings.map(function (meaning, index) {
                var boundClick = this.handleClick.bind(this, index);
                return (
                    <a href="#" className="list-group-item" onClick={boundClick}>{meaning.text}</a>
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