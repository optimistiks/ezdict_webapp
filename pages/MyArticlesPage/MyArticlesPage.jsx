var React = require('react');
var AuthCheck = require('../../mixins/AuthCheck');
var MyArticlesList = require('../../components/MyArticlesList/MyArticlesList.jsx');
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
