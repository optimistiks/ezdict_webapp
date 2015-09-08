var React = require('react');

var AuthCheck = require('../../../common/mixins/AuthCheck');
var UserProfile = require('../../../profile/components/UserProfile/UserProfile.jsx');


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
