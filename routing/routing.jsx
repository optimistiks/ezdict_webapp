var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var NavBar = require('../components/NavBar/NavBar.jsx');
var TranslationHistoryList = require('../components/TranslationHistoryList/TranslationHistoryList.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <div className="row">
          <NavBar/>
        </div>
        <div className="row">
          <div className="col-md-12">
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="history" handler={TranslationHistoryList} />
    <Route name="learning" handler={TranslationHistoryList} />
    <Route name="learned" handler={TranslationHistoryList} />
    <Route name="my-articles" handler={TranslationHistoryList} />
    <Redirect from="/" to="history" />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
