var React = require('react');

var Router = require('react-router');
var State = Router.State;

var AuthCheck = require('../../../common/mixins/AuthCheck');

var QuizForm = require('../../components/QuizForm/QuizForm.jsx');

var t = require('../../../common/modules/t');
var api = require('../../../common/modules/api');


module.exports = React.createClass({

    mixins: [AuthCheck, State],

    getInitialState: function () {
        return {quiz: {}, quizAnswers: []};
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
        return (
            <div className="row">
                <div className="col-xs-12">
                    <QuizForm quiz={this.state.quiz}
                              quizAnswers={this.state.quizAnswers}
                              // todo: may be unneeded
                              handleQuizChange={this.handleQuizChange}
                              handleQuizAnswersChange={this.handleQuizAnswersChange}/>
                </div>
            </div>
        );
    }
});
