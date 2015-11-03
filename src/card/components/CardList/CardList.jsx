var React = require('react');
var t = require('../../../common/modules/t');
var api = require('../../../common/modules/api');
var Link = require('../../../common/components/Link/Link.jsx');


module.exports = React.createClass({

    next: 1,

    getInitialState: function () {
        return {cards: [], cardFilter: false};
    },

    componentDidMount: function () {
        this.loadCards();
    },

    loadCards: function () {
        var query = {page: this.next};
        api.card.get(query)
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

    onFilterRadioChange: function (event) {
        var value = event.target.value;
        var state = {};
        state[event.target.name] = value;
        this.setState(state);
    },

    render: function () {
        var cardNodes = this.state.cards.length ?
            this.state.cards
                .filter(function (card) {

                    // possible values of this.state.cardFilter are equal to the names of card relations
                    return !this.state.cardFilter || card[this.state.cardFilter]

                }.bind(this))
                .map(function (card) {

                    var toStudyLabel = null;
                    if (card.to_study) {
                        toStudyLabel = <span className="label label-info">{t('cardToStudyLabel')}</span>;
                    }

                    var isLearnedLabel = null;
                    if (card.is_learned) {
                        isLearnedLabel = <span className="label label-success">{t('cardIsLearnedLabel')}</span>;
                    }

                    return (
                        <Link key={card.id} to={'card/' + card.id} className="list-group-item">
                            <h4 className="list-group-item-heading">{card.text}</h4>
                            <p className="list-group-item-text">{card.article}</p>
                            {toStudyLabel}{isLearnedLabel}
                        </Link>
                    );
                }) : <p className="text-muted">{t('noCardsText')}</p>;

        var moreButton = this.next ?
            <button type="button" className="btn btn-default btn-block" onClick={this.loadCards}>{t('More')}</button>
            : undefined;

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-12">
                            <ul className="list-inline">
                                <li>
                                    <label className="radio-inline">
                                        <input type="radio" name="cardFilter" value=""
                                               checked={!this.state.cardFilter}
                                               onChange={this.onFilterRadioChange}
                                        />
                                        {t('allCardsFilterLabel')}
                                    </label>
                                </li>
                                <li>
                                    <label className="radio-inline">
                                        <input type="radio" name="cardFilter" value="to_study"
                                               checked={this.state.cardFilter === 'to_study'}
                                               onChange={this.onFilterRadioChange}
                                        />
                                        {t('toStudyCardsFilterLabel')}
                                    </label>
                                </li>
                                <li>
                                    <label className="radio-inline">
                                        <input type="radio" name="cardFilter" value="is_learned"
                                               checked={this.state.cardFilter === 'is_learned'}
                                               onChange={this.onFilterRadioChange}
                                        />
                                        {t('isLearnedCardsFilterLabel')}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="list-group">
                                {cardNodes}
                            </div>
                            {moreButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
