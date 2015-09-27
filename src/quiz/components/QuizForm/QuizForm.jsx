var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;

var $ = require('jquery');
var api = require('../../../common/modules/api');
var t = require('../../../common/modules/t');


module.exports = React.createClass({

    mixins: [Navigation, State],

    getInitialState: function () {
        return {};
    },

    handleSubmit: function (e) {
        e.preventDefault();

        var answers = [];

        this.props.quiz.quiz_cards.forEach(function (quizCard) {
            var quizCardJq = $(React.findDOMNode(this.refs['quizCard' + quizCard.id]));
            var inputs = quizCardJq.find('input');
            inputs.each(function (index, input) {
                answers.push({
                    quiz: this.props.quiz.id,
                    quiz_card: quizCard.id,
                    text: $(input).val()
                });
            }.bind(this))
        }.bind(this));

        api.quizAnswers.post(answers)
            .then(function () {
                return api.quizzes.get(this.props.quiz.id);
            }.bind(this))
            .then(function (quiz) {
                this.props.handleQuizChange(quiz)
            }.bind(this))
            .catch(function (exception) {
            }.bind(this))
    },

    render: function () {

        var quizCardNodes = this.props.quiz.quiz_cards.map(function (quizCard) {

            var answerNodes = quizCard.card.meanings.map(function () {
                return (
                    <li className="form-group">
                        <input name="answer[]" type="text" className="form-control"/>
                    </li>
                )
            }.bind(this));

            return (
                <fieldset ref={'quizCard' + quizCard.id}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">{quizCard.card.text}</label>
                    </div>
                    <ul className="list-unstyled">
                        {answerNodes}
                    </ul>
                </fieldset>
            );

        }.bind(this));

        return (
            <form onSubmit={this.handleSubmit}>
                {quizCardNodes}
                <button type="submit" className="btn btn-lg btn-block btn-success">{t('saveButton')}</button>
            </form>
        );
    }
});
