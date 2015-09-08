var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var NavBar = require('../../../navbar/components/NavBar/NavBar.jsx');


module.exports = React.createClass({
    render: function () {
        return (
            <div className="container-fluid">
                <NavBar/>
                <RouteHandler/>
            </div>
        );
    }
});
