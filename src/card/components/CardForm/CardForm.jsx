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
        return {card: {}, errors: {}};
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({card: nextProps.card});
    },

    handleSubmit: function (e) {
        e.preventDefault();
        (this.state.card.id ? api.card.put(this.state.card.id, this.state.card) : api.card.post(this.state.card))
            .then(function () {
                this.transitionTo('card', this.getParams());
            }.bind(this)).catch(function (exception) {
                this.setState({errors: exception.error});
            }.bind(this));
    },

    handleChange: function (event) {
        // todo: copy
        var card = this.state.card;
        card[event.target.name] = event.target.value;
        this.props.handleChange(card);
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
                        <h3 className="panel-title">{t('cardFormPanelTitle')} <strong>{this.state.card.text || this.props.text}</strong>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                {errorNodes}
                            </div>
                        </div>
                        <input required type="hidden" name="id" value={this.state.card.id}/>
                        <div className="form-group">
                            <label htmlFor="text">Описание</label>
                            <textarea className="form-control" id="article" placeholder={t('cardArticleInputLabel')}
                                      name="article" value={this.state.card.article} onChange={this.handleChange}/>
                        </div>
                        <CardFormMeaningsList card={this.state.card}/>
                        <button type="submit" className="btn btn-success">{t('saveButton')}</button>
                    </div>
                </div>
            </form>
        );
    }
});
