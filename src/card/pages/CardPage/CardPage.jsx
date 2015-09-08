var React = require('react');
var AuthCheck = require('../../../common/mixins/AuthCheck');
var CardList = require('../../components/CardList/CardList.jsx');
var Link = require('../../../common/components/Link/Link.jsx');
var t = require('../../../common/modules/t');


module.exports = React.createClass({
    mixins: [AuthCheck],
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <CardList/>
                </div>
            </div>
        );
    }
});
