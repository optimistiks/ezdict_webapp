var React = require('react');
module.exports = React.createClass({
  render: function () {
    return (
      <div className="list-group">
        <a href="#" className="list-group-item">
          <h4 className="list-group-item-heading">Hello</h4>
          <p className="list-group-item-text">Приветствие обычное</p>
        </a>
        <a href="#" className="list-group-item">
          <h4 className="list-group-item-heading">Yo dawg</h4>
          <p className="list-group-item-text">Что смотришь пёс</p>
        </a>
        <a href="#" className="list-group-item">
          <h4 className="list-group-item-heading">cabron cj cool fuck</h4>
          <p className="list-group-item-text">сиджоджи углепластик охлаждай трахание</p>
        </a>
      </div>
    );
  }
});