var React = require('react');
var AuthCheck = require('../../react_mixins/AuthCheck');
var MyArticlesList = require('../../react_components/MyArticlesList/MyArticlesList.jsx');
module.exports = React.createClass({
  mixins: [AuthCheck],
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-12">
          <MyArticlesList/>
        </div>
      </div>
    );
  }
});
