var React = require('react');
var AuthCheck = require('../../mixins/AuthCheck');
var CardForm = require('../../components/CardForm/CardForm.jsx');
var api = require('../../modules/api');
var Form = require('../../mixins/Form');
var t = require('../../modules/t');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;


module.exports = React.createClass({

    mixins: [AuthCheck, Navigation, State, Form],

    getInitialState: function () {
        return {card: {}};
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

    handleChange: function (card) {
        this.setState({card: card});
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <CardForm card={this.state.card} text={this.getTextParam()} handleChange={this.handleChange}/>
                </div>
            </div>
        );
    }
});
