var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;

var api = require('../../../common/modules/api');
var t = require('../../../common/modules/t');

var CardFormMeaningsList = require('../CardFormMeaningsList/CardFormMeaningsList.jsx');


module.exports = React.createClass({

    mixins: [Navigation, State],

    getInitialState: function () {
        return {errors: {}, meaningsToDelete: [], addToStudy: false};
    },

    handleSubmit: function (e) {
        e.preventDefault();
        (this.props.card.id ? api.card.put(this.props.card.id, this.props.card) : api.card.post(this.props.card))
            .then(this.cardSubmitCallback)
            .catch(function (exception) {
                this.setState({errors: exception.error});
            }.bind(this));
    },

    cardSubmitCallback: function (card) {
        var idsToDelete = this.state.meaningsToDelete.map(function (meaning) {
            return meaning.id;
        });

        var newMeanings = this.props.meanings.filter(function (meaning) {
            return !meaning.id;
        });

        newMeanings = newMeanings.map(function (card, meaning) {
            meaning.card = card.id;
            return meaning;
        }.bind(this, card));

        var createNewMeanings = function (newMeanings) {
            api.meaning.post(newMeanings).then(function () {
                if (this.state.addToStudy) {
                    api.toStudy.post({card: card.id}).then(function () {
                        this.transitionTo('card', this.getParams());
                    }.bind(this))
                } else {
                    this.transitionTo('card', this.getParams());
                }
            }.bind(this));
        }.bind(this, newMeanings);

        if (idsToDelete.length) {
            api.meaning.deleteBatch(idsToDelete).then(createNewMeanings);
        } else {
            createNewMeanings();
        }
    },

    handleMeaningDeletion: function (meaning) {
        this.setState({meaningsToDelete: this.state.meaningsToDelete.concat([meaning])});
    },

    handleCardChange: function (event) {
        // todo: copy
        var card = this.props.card;
        card[event.target.name] = event.target.value;
        this.props.handleCardChange(card);
    },

    handleAddToStudyChange: function (event) {
        this.setState({
            addToStudy: event.target.checked
        });
    },

    render: function () {
        var errors = [];

        Object.keys(this.state.errors).forEach(function (key) {
            errors.push(this.state.errors[key]);
        }.bind(this));

        var errorNodes = errors.map(function (error) {
            return (
                <p className="text-danger">{error}</p>
            );
        });

        var statusBlock = null;
        if (this.props.card.to_study) {
            statusBlock = <span className="label label-info">{t('cardToStudyLabel')}</span>;
        }

        if (!this.props.card.to_study && !this.props.card.is_learned) {
            statusBlock = (<div className="checkbox">
                <label>
                    <input type="checkbox"
                           checked={this.state.addToStudy}
                           onChange={this.handleAddToStudyChange}
                    >{t('addToStudyCheckboxLabel')}</input>
                </label>
            </div>)
        }

        if (this.props.card.is_learned) {
            statusBlock = (<span className="label label-success">{t('cardIsLearnedLabel')}</span>)
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title">{t('cardFormPanelTitle')}
                            &nbsp;<strong>{this.props.text}</strong>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                {errorNodes}
                            </div>
                        </div>
                        <input required type="hidden" name="id" value={this.props.card.id}/>
                        <div className="form-group">
                            {statusBlock}
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">{t('cardFormArticleLabel')}</label>
                            <textarea className="form-control" id="article" placeholder={t('cardArticleInputLabel')}
                                      name="article" value={this.props.card.article} onChange={this.handleCardChange}/>
                        </div>
                        <CardFormMeaningsList card={this.props.card}
                                              meanings={this.props.meanings}
                                              handleMeaningDeletion={this.handleMeaningDeletion}
                                              handleMeaningsChange={this.props.handleMeaningsChange}/>
                        <button type="submit" className="btn btn-success">{t('saveButton')}</button>
                    </div>
                </div>
            </form>
        );
    }
});
