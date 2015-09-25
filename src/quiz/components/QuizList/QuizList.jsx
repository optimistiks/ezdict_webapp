var React = require('react');
var t = require('../../../common/modules/t');
var api = require('../../../common/modules/api');
var Link = require('../../../common/components/Link/Link.jsx');
var List = require('../../../common/mixins/List');


module.exports = React.createClass({

    mixins: [List],

    getter: api.quiz.get,

    render: function () {
        var quizNodes = this.state.items
            .map(function (quiz) {
                //todo completed label, type label
                //todo filter by to study, by is learned, by completed
                return (
                    <Link to="quiz-form" params={{id: quiz.id}} className="list-group-item">
                        <h4 className="list-group-item-heading">Тест #{quiz.id} от {quiz.created}</h4>
                    </Link>
                );
            });

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