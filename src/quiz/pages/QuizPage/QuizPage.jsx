var React = require('react');
var AuthCheck = require('../../../common/mixins/AuthCheck');
var QuizList = require('../../components/QuizList/QuizList.jsx');
var t = require('../../../common/modules/t');
var Button = require('../../../common/components/Button/Button.jsx');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;
var api = require('../../../common/modules/api');
var appEventEmitter = require('../../../common/modules/event-emitter');


module.exports = React.createClass({

    mixins: [AuthCheck, Navigation, State],

    getInitialState: function () {
        return {requestInProgress: false};
    },

    startQuiz: function (type) {
        this.toggleButtons();
        var data = {type: type};
        api.quizzes.post(data).then(function (quiz) {
            var params = this.getParams();
            params['id'] = quiz.id;
            this.transitionTo('quiz-form', params);
        }.bind(this)).catch(function (exception) {
            appEventEmitter.emitRequestException(exception)
        }).finally(function () {
            this.toggleButtons();
        }.bind(this))
    },

    startToStudyQuiz: function () {
        this.startQuiz('to_study');
    },

    startIsLearnedQuiz: function () {
        this.startQuiz('is_learned');
    },

    toggleButtons: function () {
        this.setState({requestInProgress: !this.state.requestInProgress});
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-12">
                            <ul className="list-inline">
                                <li>
                                    <Button type="button" onClick={this.startToStudyQuiz}
                                            disabled={this.state.requestInProgress}
                                            className="btn-info" buttonText={t('startToStudyQuiz')}/>
                                </li>
                                <li>
                                    <Button type="button" onClick={this.startIsLearnedQuiz}
                                            disabled={this.state.requestInProgress}
                                            className="btn-success" buttonText={t('startIsLearnedQuiz')}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <QuizList/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
