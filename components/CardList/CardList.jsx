var React = require('react');
var t = require('../../modules/t');
var api = require('../../modules/api');
var Link = require('../../components/Link/Link.jsx');

module.exports = React.createClass({

    next: 1,

    loadCards: function () {
        api.card.get({page: this.next})
            .then(function (response) {
                if (!this.isMounted()) {
                    return false;
                }

                if (response.next) {
                    ++this.next;
                } else {
                    this.next = null;
                }

                this.setState({
                    cards: this.state.cards.concat(response.results)
                });
            }.bind(this)).catch(function (exception) {
                console.error(exception);
            });
    },

    getInitialState: function () {
        return {cards: []};
    },

    componentDidMount: function () {
        this.loadCards();
    },

    render: function () {

        var cardNodes = this.state.cards.map(function (card) {
            return (
                <Link to="card-form" params={{id: card.id}} className="list-group-item">
                    <h4 className="list-group-item-heading">{card.text}</h4>
                    <p className="list-group-item-text">{card.article}</p>
                </Link>
            );
        });

        var moreButton = this.next ?
            <button type="button" className="btn btn-default btn-block" onClick={this.loadCards}>{t('More')}</button>
            : undefined;

        return (
            <div>
                <div className="list-group">
                    {cardNodes}
                </div>
                {moreButton}
            </div>
        );
    }
});