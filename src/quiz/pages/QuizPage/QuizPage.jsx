var React = require('react');
var AuthCheck = require('../../../common/mixins/AuthCheck');
var QuizList = require('../../components/QuizList/QuizList.jsx');
var t = require('../../../common/modules/t');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;
var api = require('../../../common/modules/api');
var appEventEmitter = require('../../../common/modules/event-emitter');


module.exports = React.createClass({

    mixins: [AuthCheck, Navigation, State],

    startQuiz: function (type) {
        var data = {type: type};
        api.quizzes.post(data).then(function (quiz) {
            var params = this.getParams();
            params['id'] = quiz.id;
            this.transitionTo('quiz-form', params);
        }.bind(this)).catch(function (exception) {
            appEventEmitter.emitRequestException(exception)
        })
    },

    startToStudyQuiz: function () {
        this.startQuiz('to_study');
    },

    startIsLearnedQuiz: function () {
        this.startQuiz('is_learned');
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-12">
                            <ul className="list-inline">
                                <li>
                                    <button type="button" onClick={this.startToStudyQuiz}
                                            className="btn btn-primary">{t('startToStudyQuiz')}</button>
                                </li>
                                <li>
                                    <button type="button" onClick={this.startIsLearnedQuiz}
                                            className="btn btn-info">{t('startIsLearnedQuiz')}</button>
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
