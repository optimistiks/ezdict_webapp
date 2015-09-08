var React = require('react');

var AuthCheck = require('../../../common/mixins/AuthCheck');
var LearningWordsList = require('../../../word/components/LearningWordsList/LearningWordsList.jsx');


module.exports = React.createClass({
    mixins: [AuthCheck],
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <LearningWordsList/>
                </div>
            </div>
        );
    }
});
