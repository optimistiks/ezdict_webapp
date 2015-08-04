var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Link = Router.Link;
var NavLi = require('./NavLi/NavLi.jsx');

module.exports = React.createClass({
  render: function () {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse"
                  aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="history">EzDict</Link>
        </div>

        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav">
            <NavLi to="history">История переводов</NavLi>
            <NavLi to="learning">Изучаемые слова</NavLi>
            <NavLi to="learned">Изученные слова</NavLi>
            <NavLi to="my-articles">Мои переводы</NavLi>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                 aria-expanded="false">optimistiks <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Профиль</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Выход</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
});