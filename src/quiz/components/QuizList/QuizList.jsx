var React = require('react');
var t = require('../../../common/modules/t');
var api = require('../../../common/modules/api');
var Link = require('../../../common/components/Link/Link.jsx');
var List = require('../../../common/mixins/List');
var formatDatetime = require('../../../common/modules/format-datetime');

module.exports = React.createClass({

    mixins: [List],

    getter: api.quizzes.get.bind(api.quizzes),

    render: function () {
        var quizNodes = this.state.items.length ?
            this.state.items.map(function (quiz) {
                //todo filter by to study, by is learned, by completed

                var quizTypeLabel = <span className="label label-info">{t('quizTypeLabel_' + quiz.type)}</span>;
                var quizCreatedLabel = <span className="label label-info">{t('quizCreatedLabel')} {formatDatetime(quiz.created)}</span>;

                var quizCompletedLabel = null;
                if (quiz.completed) {
                    quizCompletedLabel = <span className="label label-success">{t('quizCompletedlabel')} {formatDatetime(quiz.completed)}</span>;
                }

                return (
                    <Link to="quiz-form" params={{id: quiz.id}} className="list-group-item">
                        <h4 className="list-group-item-heading">{t('quizListItemHeader')} #{quiz.id}</h4>
                        <div className="list-group-item-text">{quizTypeLabel} {quizCreatedLabel} {quizCompletedLabel}</div>
                    </Link>
                );
            }) : <p className="text-muted">{t('noQuizzesText')}</p>;

        var moreButton = this.getMoreButton();

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="list-group">
                                {quizNodes}
                            </div>
                            {moreButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});