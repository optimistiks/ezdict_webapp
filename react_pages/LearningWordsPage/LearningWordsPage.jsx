var React = require('react');
var AuthCheck = require('../../react_mixins/AuthCheck');
var LearningWordsList = require('../../react_components/LearningWordsList/LearningWordsList.jsx');
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
