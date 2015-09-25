var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;

var api = require('../../../common/modules/api');
var t = require('../../../common/modules/t');


module.exports = React.createClass({

    mixins: [Navigation, State],

    getInitialState: function () {
        return {};
    },

    handleSubmit: function (e) {
        e.preventDefault();
        api.quizAnswers.post(this.props.quizAnswers)
            .then(function () {
                return api.quizzes.get(this.props.quiz.id);
            }.bind(this))
            .then(function (quiz) {
                this.handleQuizChange(quiz)
            }.bind(this))
            .catch(function (exception) {
                this.setState({errors: exception.error});
            }.bind(this))
    },

    render: function () {
        var errors = [];

        Object.keys(this.state.errors).forEach(function (key) {
            errors.push(this.state.errors[key]);
        }.bind(this));

        // todo: separated block, which will handle the completed quiz case
        var quizCardNodes = this.prop.quiz.quiz_cards.map(function (quizCard) {
            var answerNodes = quizCard.card.meanings.map(function () {
                //todo: bind a change handler to input, with signature handler(quiz_card, event)
                return (
                    <input type="text"/>
                )
            });
            return (
                <div>
                    <p>{quizCard.card.text}</p>
                    {answerNodes}
                </div>
            );
        });

        return (
            <form onSubmit={this.handleSubmit}>
                {quizCardNodes}
            </form>
        );
    }
});
