var React = require('react');
var AuthCheck = require('../../mixins/AuthCheck');
var UserProfile = require('../../components/UserProfile/UserProfile.jsx');
module.exports = React.createClass({
  mixins: [AuthCheck],
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-4">
          <UserProfile/>
        </div>
      </div>
    );
  }
});
