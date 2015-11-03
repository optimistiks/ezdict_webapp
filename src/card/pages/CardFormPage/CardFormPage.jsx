var React = require('react');

var Router = require('react-router');

var Form = require('../../../common/mixins/Form');
var CardPossibleMeaningsList = require('../../components/CardPossibleMeaningsList/CardPossibleMeaningsList.jsx');
var CardForm = require('../../components/CardForm/CardForm.jsx');

var t = require('../../../common/modules/t');
var api = require('../../../common/modules/api');


module.exports = React.createClass({

    mixins: [Form],

    getInitialState: function () {
        return {card: {}, meanings: []};
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
            var meanings = card.meanings;
            delete card.meanings;
            this.setState({
                card: card,
                meanings: meanings
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
            //todo: card model structure should not be defined here
            return response.results[0] || {meanings: [], text: text};
        });
    },

    getTextParam: function (props) {
        return parseInt(props.params.id, 10) ? '' : props.params.id;
    },

    handleCardChange: function (card) {
        this.setState({card: card});
    },

    handleMeaningsChange: function (meanings) {
        this.setState({meanings: meanings});
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-7">
                    <CardForm card={this.state.card}
                              meanings={this.state.meanings}
                              text={this.state.card.text || this.getTextParam(this.props)}
                              handleCardChange={this.handleCardChange}
                              handleMeaningsChange={this.handleMeaningsChange}/>
                </div>
                <div className="col-xs-5">
                    <CardPossibleMeaningsList card={this.state.card}
                                              meanings={this.state.meanings}
                                              handleMeaningsChange={this.handleMeaningsChange}
                                              text={this.state.card.text || this.getTextParam(this.props)}/>
                </div>
            </div>
        );
    }
});
