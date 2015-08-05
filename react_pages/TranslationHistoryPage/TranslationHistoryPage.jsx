var React = require('react');
var TranslationHistoryList = require('../../react_components/TranslationHistoryList/TranslationHistoryList.jsx');
module.exports = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col-md-12">
          <TranslationHistoryList/>
        </div>
      </div>
    );
  }
});
