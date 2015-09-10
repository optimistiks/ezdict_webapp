var React = require('react');

var api = require('../../../common/modules/api');
var cardEventEmitter = require('../../modules/event-emitter');


module.exports = React.createClass({

    handleClick: function (index, event) {
        event.preventDefault();
        var cardMeanings = this.props.meanings;
        var clickedMeaning = cardMeanings[index];
        cardMeanings.splice(index, 1);
        this.props.handleMeaningsChange(cardMeanings);
        if (clickedMeaning.id) {
            this.props.handleMeaningDeletion(clickedMeaning);
        }
    },

    render: function () {

        var meaningNodes = null;

        if (this.props.meanings.length) {
            meaningNodes = this.props.meanings.map(function (meaning, index) {
                var boundClick = this.handleClick.bind(this, index);
                return (
                    <a href="#" className="list-group-item" onClick={boundClick}>{meaning.text}</a>
                );
            }.bind(this));

        }

        return (
          <div className="form-group">
            <label htmlFor="text">Значения</label>
            <ul className="list-group">
              {meaningNodes}
              <li className="list-group-item">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Значение" />
                                <span className="input-group-btn">
                                  <button className="btn btn-info" type="button">Добавить</button>
                                </span>
                </div>
              </li>
            </ul>
          </div>
        );
    }
});