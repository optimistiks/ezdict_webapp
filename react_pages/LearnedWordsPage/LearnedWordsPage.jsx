var React = require('react');
var LearnedWordsList = require('../../react_components/LearnedWordsList/LearnedWordsList.jsx');
module.exports = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col-md-12">
          <LearnedWordsList/>
        </div>
      </div>
    );
  }
});
