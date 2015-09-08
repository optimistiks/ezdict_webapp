var React = require('react');

var AuthCheck = require('../../../common/mixins/AuthCheck');
var TranslationHistoryList = require('../../../history/components/TranslationHistoryList/TranslationHistoryList.jsx');


module.exports = React.createClass({
    mixins: [AuthCheck],
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <TranslationHistoryList />
                </div>
            </div>
        );
    }
});
