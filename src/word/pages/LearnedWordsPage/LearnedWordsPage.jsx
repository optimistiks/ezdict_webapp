var React = require('react');

var AuthCheck = require('../../../common/mixins/AuthCheck');
var LearnedWordsList = require('../../../word/components/LearnedWordsList/LearnedWordsList.jsx');


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
