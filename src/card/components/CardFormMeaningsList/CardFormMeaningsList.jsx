var React = require('react');

var api = require('../../../common/modules/api');
var t = require('../../../common/modules/t');
var cardEventEmitter = require('../../modules/event-emitter');


module.exports = React.createClass({

    getInitialState: function () {
        return {newMeaningText: ''};
    },

    handleMeaningClick: function (index, event) {
        event.preventDefault();
        var cardMeanings = this.props.meanings;
        var clickedMeaning = cardMeanings[index];
        cardMeanings.splice(index, 1);
        this.props.handleMeaningsChange(cardMeanings);
        if (clickedMeaning.id) {
            this.props.handleMeaningDeletion(clickedMeaning);
        }
    },

    handleNewMeaningTextChange: function (event) {
        this.setState({
            newMeaningText: event.target.value
        });
    },

    handleAddMeaningClick: function () {
        var cardMeanings = this.props.meanings;
        //todo: DRY violation, move CardMeaning structure to model
        cardMeanings.push({text: this.state.newMeaningText});
        this.setState({
            newMeaningText: ''
        });
        this.props.handleMeaningsChange(cardMeanings);
    },

    render: function () {

        var meaningNodes = null;

        if (this.props.meanings.length) {
            meaningNodes = this.props.meanings.map(function (meaning, index) {
                var boundClick = this.handleMeaningClick.bind(this, index);
                return (
                    <a href="#" className="list-group-item" onClick={boundClick}>{meaning.text}</a>
                );
            }.bind(this));

        }

        return (
            <div className="form-group">
                <label htmlFor="text">{t('cardFormMeaningsLabel')}</label>
                <ul className="list-group">
                    {meaningNodes}
                    <li className="list-group-item">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder={t('cardFormMeaningPlaceholder')}
                                   value={this.state.newMeaningText}
                                   onChange={this.handleNewMeaningTextChange}
                            />
                            <span className="input-group-btn">
                              <button className="btn btn-info" type="button"
                                      onClick={this.handleAddMeaningClick}>
                                  {t('addButtonText')}
                              </button>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
});