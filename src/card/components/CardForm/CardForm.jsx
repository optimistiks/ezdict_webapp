var React = require('react');
var Router = require('react-router');
var History = Router.History;

var api = require('../../../common/modules/api');
var t = require('../../../common/modules/t');
var metrika = require('../../../common/modules/ya-metrika');
var routeParamsStore = require('../../../common/modules/route-params-store');

var CardFormMeaningsList = require('../CardFormMeaningsList/CardFormMeaningsList.jsx');


module.exports = React.createClass({

    mixins: [History],

    getInitialState: function () {
        return {errors: {}, meaningsToDelete: [], addToStudy: false};
    },

    handleSubmit: function (e) {
        e.preventDefault();
        this.createOrUpdateCard()
            .then(this.cardSubmitCallback)
            .catch(function (exception) {
                this.setState({errors: exception.error});
            }.bind(this));
    },

    createOrUpdateCard: function () {
        if (this.props.card.id) {
            return api.card.put(this.props.card.id, this.props.card);
        } else {
            return api.card.post(this.props.card)
                .then(function (response) {
                    metrika.reachGoal('CARD_CREATED');
                    return response;
                })
        }
    },

    cardSubmitCallback: function (card) {
        // получаем id значений которые нужно будет удалить
        var idsToDelete = this.state.meaningsToDelete.map(function (meaning) {
            return meaning.id;
        });

        // получаем массив моделей новых значений (те что без id)
        var newMeanings = this.props.meanings.filter(function (meaning) {
            return !meaning.id;
        });

        // проставляем всем новым значениям id карточки
        newMeanings = newMeanings.map(function (card, meaning) {
            meaning.card = card.id;
            return meaning;
        }.bind(this, card));

        var createNewMeanings = function (newMeanings) {
            // создаем новые значения
            api.meaning.post(newMeanings)
                .then(function (response) {
                    if (this.state.addToStudy) {
                        // если стоит чекбокс "добавить в изучаемые", добавляем
                        // todo: можно сделать параллельно с запросом на значения (после создания карточки)
                        return api.toStudy.post({card: card.id}).then(function () {
                            return response
                        });
                    } else {
                        return response;
                    }
                }.bind(this))
                .then(function () {
                    // после всех запросов редирект на список
                    this.history.pushState(null, '/:lng/card'.replace(':lng', routeParamsStore.getLng()));
                }.bind(this));
        }.bind(this, newMeanings);

        if (idsToDelete.length) {
            // если есть значения которые нужно удалить, удаляем, затем создаем новые
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
                    />
                    {t('addToStudyCheckboxLabel')}
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
