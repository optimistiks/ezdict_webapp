var React = require('react');
var UserProfile = require('../../react_components/UserProfile/UserProfile.jsx');
module.exports = React.createClass({
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
