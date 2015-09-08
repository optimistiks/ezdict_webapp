var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;

var AuthCheck = require('../../../common/mixins/AuthCheck');
var Form = require('../../../common/mixins/Form');

var CardPossibleMeaningsList = require('../../components/CardPossibleMeaningsList/CardPossibleMeaningsList.jsx');
var CardForm = require('../../components/CardForm/CardForm.jsx');

var t = require('../../../common/modules/t');
var api = require('../../../common/modules/api');


module.exports = React.createClass({

    mixins: [AuthCheck, Navigation, State, Form],

    getInitialState: function () {
        return {card: {}};
    },

    componentDidMount: function () {
        this.loadCardAndUpdateState(this.props);
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.params.id !== this.props.params.id) {
            this.loadCardAndUpdateState(nextProps);
        }
    },

    loadCardAndUpdateState: function (props) {
        return this.loadCard(props).then(function (card) {
            this.setState({
                card: card
            });
        }.bind(this)).catch(function (exception) {
            console.error(exception);
        });
    },

    loadCard: function (props) {
        var text = this.getTextParam(props);
        return text ? this.loadCardByText(text) : this.loadCardById(props.params.id)
    },

    loadCardById: function (id) {
        return api.card.get(id)
    },

    loadCardByText: function (text) {
        return api.card.get({text: text}).then(function (response) {
            return response.results[0] || {};
        });
    },

    getTextParam: function (props) {
        return parseInt(props.params.id, 10) ? '' : props.params.id;
    },

    handleChange: function (card) {
        this.setState({card: card});
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <CardForm card={this.state.card} text={this.getTextParam(this.props)} handleChange={this.handleChange}/>
                </div>
                <div className="col-xs-6">
                    <CardPossibleMeaningsList text={this.state.card.text || this.getTextParam(this.props)}/>
                </div>
            </div>
        );
    }
});
