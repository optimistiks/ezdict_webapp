var React = require('react');
var AuthCheck = require('../../../common/mixins/AuthCheck');
var QuizList = require('../../components/QuizList/QuizList.jsx');
var Link = require('../../../common/components/Link/Link.jsx');
var t = require('../../../common/modules/t');


module.exports = React.createClass({
    mixins: [AuthCheck],
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <QuizList/>
                </div>
            </div>
        );
    }
});
