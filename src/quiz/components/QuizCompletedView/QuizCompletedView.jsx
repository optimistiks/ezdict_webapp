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
            return answersByQuizCard;
        }, {});

        var quizCardNodes = this.props.quiz.quiz_cards.map(function (quizCard) {

            var answerNodes = answersMap[quizCard.id].map(function (answer) {

                var isCorrectLabel = answer.is_correct ?
                    <span className="label label-success">{t('correctQuizAnswerLabel')}</span> :
                    <span className="label label-danger">{t('incorrectQuizAnswerLabel')}</span>;

                var answerTextClass = answer.text ?
                    (answer.is_correct ? 'text-success' : 'text-danger') :
                    'text-muted';

                var answerTextContent = answer.text || t('quizAnswerNotGiven');

                return (
                    <li className="form-group">
                        <p className={answerTextClass}>{answerTextContent} {isCorrectLabel}</p>
                    </li>
                )
            }.bind(this));

            return (
                <fieldset ref={'quizCard' + quizCard.id}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">{quizCard.card.text}</label>
                    </div>
                    <ol>
                        {answerNodes}
                    </ol>
                </fieldset>
            );

        }.bind(this));

        return (
            <form>
                {quizCardNodes}
            </form>
        );
    }
});
