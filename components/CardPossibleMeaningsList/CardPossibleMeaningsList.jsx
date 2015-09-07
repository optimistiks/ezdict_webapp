var React = require('react');
var auth = require('../../modules/auth');
var api = require('../../modules/api');
var t = require('../../modules/t');
var eventEmitter = require('../../modules/event-emitter');


module.exports = React.createClass({

    mixins: [],

    getInitialState: function () {
        return {meanings: []};
    },

    componentDidMount: function () {
        if (!this.props.text) {
            return;
        }

        this.loadTranslationAndUpdateState(this.props.text);
    },

    componentWillReceiveProps: function (nextProps) {
        if (!nextProps.text || this.props.text === nextProps.text) {
            return;
        }

        this.loadTranslationAndUpdateState(nextProps.text);
    },

    loadTranslationAndUpdateState: function (text) {
        this.loadTranslation(text).then(function (translation) {
            this.setState({
                meanings: this.extractMeanings(translation)
            });
        }.bind(this)).catch(function (exception) {
            console.error(exception);
        });
    },

    loadTranslation: function (text) {
        return api.getProfile().then(function (profile) {
            return api.translate(text, profile.target_lang);
        }.bind(this)).catch(function (exception) {
            console.error(exception);
        });
    },

    extractMeanings: function (translation) {
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
        var meaning = this.state.meanings[index];
        console.log(meaning);
        eventEmitter.emit('doorOpen');
    },


    render: function () {
        var meaningNodes = this.state.meanings.map(function (text, index) {
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
