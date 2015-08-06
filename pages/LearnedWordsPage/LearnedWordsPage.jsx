var React = require('react');
var AuthCheck = require('../../mixins/AuthCheck');
var LearnedWordsList = require('../../components/LearnedWordsList/LearnedWordsList.jsx');
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
