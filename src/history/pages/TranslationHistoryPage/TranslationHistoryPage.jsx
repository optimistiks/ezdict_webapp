var React = require('react');

var TranslationHistoryList = require('../../../history/components/TranslationHistoryList/TranslationHistoryList.jsx');


module.exports = React.createClass({
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
