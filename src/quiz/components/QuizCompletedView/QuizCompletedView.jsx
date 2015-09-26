var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;

var api = require('../../../common/modules/api');
var t = require('../../../common/modules/t');


module.exports = React.createClass({

    mixins: [Navigation, State],

    render: function () {

        var answersMap = this.props.quizAnswers.reduce(function (answersByQuizCard, quizAnswer) {
            if (!answersByQuizCard[quizAnswer.quiz_card]) {
                answersByQuizCard[quizAnswer.quiz_card] = [];
            }
            answersByQuizCard[quizAnswer.quiz_card].push(quizAnswer);
        }, {});

        var quizCardNodes = this.prop.quiz.quiz_cards.map(function (quizCard) {
            var answerNodes = answersMap[quizCard.id].map(function (answer) {
                return (
                    <p>{answer.text}</p>
                )
            });

            var meaningNodes = quizCard.card.meanings.map(function (meaning) {
                return (
                    <p>{meaning.text}</p>
                )
            });

            return (
                <div>
                    <p>{quizCard.card.text}</p>
                    {answerNodes}
                    {meaningNodes}
                </div>
            );
        });

        return (
         {quizCardNodes}
        );
    }
});
