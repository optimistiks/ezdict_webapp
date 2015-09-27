var React = require('react');

var Router = require('react-router');
var State = Router.State;

var AuthCheck = require('../../../common/mixins/AuthCheck');

var QuizForm = require('../../components/QuizForm/QuizForm.jsx');
var QuizCompletedView = require('../../components/QuizCompletedView/QuizCompletedView.jsx');

var t = require('../../../common/modules/t');
var api = require('../../../common/modules/api');


module.exports = React.createClass({

    mixins: [AuthCheck, State],

    getInitialState: function () {
        return {quiz: {quiz_cards: []}, quizAnswers: []};
    },

    componentDidMount: function () {
        this.loadQuizAndUpdateState(this.props);
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.params.id !== this.props.params.id) {
            this.loadQuizAndUpdateState(nextProps);
        }
    },

    loadQuizAndUpdateState: function (props) {
        return this.loadQuiz(props)
            .then(this.updateStateWithQuiz)
            .catch(function (exception) {
                console.error(exception);
            });
    },

    updateStateWithQuiz: function (quiz) {
        var quizAnswers = quiz.quiz_answers;
        delete quiz.quiz_answers;
        this.setState({
            quiz: quiz,
            quizAnswers: quizAnswers
        });
    },

    loadQuiz: function (props) {
        return api.quizzes.get(props.params.id);
    },

    handleQuizChange: function (quiz) {
        this.updateStateWithQuiz(quiz);
    },

    render: function () {

        var block = this.state.quiz.completed ? (
            <QuizCompletedView quiz={this.state.quiz}
                               quizAnswers={this.state.quizAnswers}/>
        ) : (
            <QuizForm quiz={this.state.quiz}
                      quizAnswers={this.state.quizAnswers}
                      handleQuizChange={this.handleQuizChange}/>
        );
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-6">
                            {block}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
