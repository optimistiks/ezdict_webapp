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
        return {errors: {}, meaningsToDelete: []};
    },

    handleSubmit: function (e) {
        e.preventDefault();
        (this.props.card.id ? api.card.put(this.props.card.id, this.props.card) : api.card.post(this.props.card))
            .then(function () {
                this.transitionTo('card', this.getParams());
            }.bind(this)).catch(function (exception) {
                this.setState({errors: exception.error});
            }.bind(this));
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
                            <label htmlFor="text">Описание</label>
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
