var React = require('react');
var AuthCheck = require('../../react_mixins/AuthCheck');
var TranslationHistoryList = require('../../react_components/TranslationHistoryList/TranslationHistoryList.jsx');
var histories = [
  {word: "hello", date: "23.05.2045 23:24", count: "1"},
  {word: "citizen", date: "23.05.2045 23:24", count: "2"}
];
module.exports = React.createClass({
  mixins: [AuthCheck],
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-12">
          <TranslationHistoryList histories={histories}/>
        </div>
      </div>
    );
  }
});
