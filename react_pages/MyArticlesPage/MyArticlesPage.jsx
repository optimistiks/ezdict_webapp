var React = require('react');
var MyArticlesList = require('../../react_components/MyArticlesList/MyArticlesList.jsx');
module.exports = React.createClass({
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
