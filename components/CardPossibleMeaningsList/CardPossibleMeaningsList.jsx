var React = require('react');
var auth = require('../../modules/auth');
var api = require('../../modules/api');
var t = require('../../modules/t');


module.exports = React.createClass({

    mixins: [],

    getInitialState: function () {
        return {translation: {}};
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
                translation: translation
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

    extractMeanings: function () {
        var meanings = [];
        var tran = this.state.translation;

        if (tran.translation) {
            meanings.push(tran.translation);
        }

        if (tran.ya_dict && tran.ya_dict.def.length) {
            tran.ya_dict.def.forEach(function (def) {
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


    render: function () {
        var meanings = this.extractMeanings();

        var meaningNodes = meanings.map(function (text) {
            return (
                <a href="#" className="list-group-item">{text}</a>
            );
        });

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
