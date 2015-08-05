var React = require('react');
var LearningWordsList = require('../../react_components/LearningWordsList/LearningWordsList.jsx');
module.exports = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col-md-12">
          <LearningWordsList/>
        </div>
      </div>
    );
  }
});
