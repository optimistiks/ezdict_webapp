var React = require('react');
var api = require('../../modules/api');
var Form = require('../../mixins/Form');
var t = require('../../modules/t');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;

module.exports = React.createClass({

    mixins: [Navigation, State, Form],

    getInitialState: function () {
        return {card: {}, errors: {}};
    },

    componentDidMount: function () {
        this.loadCard().then(function (card) {
            this.setState({
                card: card
            });
        }.bind(this)).catch(function () {
        });
    },

    loadCard: function () {
        var id = this.props.params.id;
        return this.getTextParam() ? api.card.get({text: id}).then(function (response) {
            return response.results[0] || {};
        }) : api.card.get(id);
    },

    getTextParam: function () {
        return parseInt(this.props.params.id, 10) ? '' : this.props.params.id;
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var formData = this.serializeAsKeyValue();
        (this.state.card.id ? api.card.put(this.state.card.id, formData) : api.card.post(formData))
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
        this.setState({card: card});
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
                <div className="row">
                    <div className="col-xs-12 text-center">
                        {errorNodes}
                    </div>
                </div>
                <input required type="hidden" name="id" value={this.state.card.id}/>
                <div className="form-group">
                    <input required type="text" className="form-control" id="text" placeholder={t('cardTextInputLabel')}
                           name="text" value={this.state.card.text}/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" id="article" placeholder={t('cardArticleInputLabel')}
                              name="article" value={this.state.card.article} onChange={this.handleChange}/>
                </div>
                <button type="submit" className="btn btn-success">{t('saveButton')}</button>
            </form>
        );
    }
});
