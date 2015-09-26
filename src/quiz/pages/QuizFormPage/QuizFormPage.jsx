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
        console.log('quizFormPage.getInitialState');
        return {quiz: {quiz_cards: []}, quizAnswers: []};
    },

    componentDidMount: function () {
        console.log('quizFormPage.componentDidMount');
        this.loadQuizAndUpdateState(this.props);
    },

    componentWillReceiveProps: function (nextProps) {
        console.log('quizFormPage.componentWillReceiveProps');
        if (nextProps.params.id !== this.props.params.id) {
            this.loadQuizAndUpdateState(nextProps);
        }
    },

    loadQuizAndUpdateState: function (props) {
        console.log('quizFormPage.loadQuizAndUpdateState', props);
        return this.loadQuiz(props).then(function (quiz) {
            var quizAnswers = quiz.quiz_answers;
            delete quiz.quiz_answers;
            this.setState({
                quiz: quiz,
                quizAnswers: quizAnswers
            });
        }.bind(this)).catch(function (exception) {
            console.error(exception);
        });
    },

    loadQuiz: function (props) {
        return api.quizzes.get(props.params.id);
    },

    handleQuizChange: function (quiz) {
        this.setState({quiz: quiz});
    },

    handleQuizAnswersChange: function (quizAnswers) {
        this.setState({quizAnswers: quizAnswers});
    },

    render: function () {
        console.log('rendering quizFormPage, state is', this.state);

        var block = this.state.quizAnswers.length ? (
            <QuizCompletedView quiz={this.state.quiz}
                               quizAnswers={this.state.quizAnswers}/>
        ) : (
            <QuizForm quiz={this.state.quiz}
                      quizAnswers={this.state.quizAnswers}
                // todo: may be unneeded
                      handleQuizChange={this.handleQuizChange}
                      handleQuizAnswersChange={this.handleQuizAnswersChange}/>
        );
        return (
            <div className="row">
                <div className="col-xs-12">
                    {block}
                </div>
            </div>
        );
    }
});
