var React = require('react');
var AuthCheck = require('../../react_mixins/AuthCheck');
var LearnedWordsList = require('../../react_components/LearnedWordsList/LearnedWordsList.jsx');
module.exports = React.createClass({
  mixins: [AuthCheck],
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-12">
          <LearnedWordsList/>
        </div>
      </div>
    );
  }
});
