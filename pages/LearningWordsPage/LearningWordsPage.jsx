var React = require('react');
var AuthCheck = require('../../mixins/AuthCheck');
var LearningWordsList = require('../../components/LearningWordsList/LearningWordsList.jsx');
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
