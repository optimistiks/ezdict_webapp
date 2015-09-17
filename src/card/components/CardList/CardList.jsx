var React = require('react');
var t = require('../../../common/modules/t');
var api = require('../../../common/modules/api');
var Link = require('../../../common/components/Link/Link.jsx');


module.exports = React.createClass({

    next: 1,

    getInitialState: function () {
        return {cards: [], filterToStudy: false};
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
        var normalizedValue = !!event.target.value;
        var state = {};
        state[event.target.name] = normalizedValue;
        this.setState(state);
    },

    render: function () {
        var cardNodes = this.state.cards
            .filter(function (card) {
                return !this.state.filterToStudy || card.to_study
            }.bind(this))
            .map(function (card) {
                var toStudyLabel = null;
                if (card.to_study) {
                    toStudyLabel = <span className="label label-info">{t('toStudyLabel')}</span>;
                }
                return (
                    <Link to="card-form" params={{id: card.id}} className="list-group-item">
                        <h4 className="list-group-item-heading">{card.text}</h4>
                        <p className="list-group-item-text">{card.article}</p>
                        {toStudyLabel}
                    </Link>
                );
            });

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
                                        <input type="radio" name="filterToStudy" value=""
                                               checked={!this.state.filterToStudy}
                                               onChange={this.onFilterRadioChange}
                                        >{t('allCardsFilterLabel')}</input>
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="filterToStudy" value="1"
                                               checked={this.state.filterToStudy}
                                               onChange={this.onFilterRadioChange}
                                        >{t('toStudyCardsFilterLabel')}</input>
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