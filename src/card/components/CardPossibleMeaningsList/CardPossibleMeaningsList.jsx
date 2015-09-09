var React = require('react');
var Promise = require('bluebird');
var auth = require('../../../common/modules/auth');
var api = require('../../../common/modules/api');
var t = require('../../../common/modules/t');
var cardEventEmitter = require('../../modules/event-emitter');


module.exports = React.createClass({

    mixins: [],

    getInitialState: function () {
        return {
            translationMeanings: []
        };
    },

    componentWillMount: function () {
        cardEventEmitter.onMeaningAddToCard(this.handleMeaningAddToCard);
    },

    componentDidMount: function () {
        if (!this.props.text) {
            return;
        }

        this.loadTranslationAndUpdateState(this.props);
    },

    componentWillReceiveProps: function (nextProps) {
        if (!nextProps.text || this.props.text === nextProps.text) {
            return;
        }

        this.loadTranslationAndUpdateState(nextProps);
    },

    loadTranslationAndUpdateState: function (props) {
        this.loadTranslation(props.text).then(function (translation) {
            this.setState({
                translationMeanings: this.extractMeaningsFromTranslation(translation)
            });
        }.bind(this)).catch(function (exception) {
            console.error(exception);
        });
    },

    loadTranslation: function (text) {
        return Promise.resolve({});
        return api.getProfile().then(function (profile) {
            return api.translate(text, profile.target_lang);
        }.bind(this)).catch(function (exception) {
            console.error(exception);
        });
    },

    handleMeaningAddToCard: function (meaning) {
        console.log('handleMeaningAddToCard', meaning);
    },

    extractMeaningsFromTranslation: function (translation) {
        return ['test1', 'test2', 'test3'];
        translation = translation || {};

        var meanings = [];

        if (translation.translation) {
            meanings.push(translation.translation);
        }

        if (translation.ya_dict && translation.ya_dict.def.length) {
            translation.ya_dict.def.forEach(function (def) {
                def.tr.forEach(function (defTr) {
                    meanings.push(defTr.text);
                    if (defTr.syn) {
                        defTr.syn.forEach(function (defTrSyn) {
                            meanings.push(defTrSyn.text);
                        });
                    }
                });
            });
        }

        return meanings;
    },

    handleClick: function (index, event) {
        event.preventDefault();
        var meanings = this.getNotIntersectedMeanings();
        var meaning = meanings[index];
        cardEventEmitter.emitPossibleMeaningClick(meaning);
    },

    getNotIntersectedMeanings: function () {
        var translationMeanings = this.state.translationMeanings;
        console.log('translationMeanings', translationMeanings);
        var cardMeanings = this.props.card.card_meanings.map(function (meaning) {
            return meaning.text;
        });
        console.log('cardMeanings', cardMeanings);

        return translationMeanings.reduce(function (result, meaning) {
            if (cardMeanings.indexOf(meaning) === -1) {
                result.push(meaning);
            }
            return result;
        }.bind(this), []);
    },


    render: function () {
        var meanings = this.getNotIntersectedMeanings();
        console.log('getNotIntersectedMeanings', meanings);

        var meaningNodes = meanings.map(function (text, index) {
            var boundClick = this.handleClick.bind(this, index);
            return (
                <a onClick={boundClick} data-meaning={text} href="#" className="list-group-item">{text}</a>
            );
        }.bind(this));

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{t('cardPossibleMeaningsPanelTitle')} <strong>{this.props.text}</strong>
                    </h3>
                </div>

                <ul className="list-group">
                    {meaningNodes}
                </ul>
            </div>
        );
    }
});
