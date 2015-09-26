var React = require('react');
var t = require('../../modules/t');

module.exports = {

    next: 1,

    getInitialState: function () {
        return {items: []};
    },

    componentDidMount: function () {
        this.loadItems();
    },

    loadItems: function () {

        if (!this.getter) {
            throw new Error('Getter is not set.');
        }

        var query = {page: this.next};
        this.getter(query)
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
                    items: this.state.items.concat(response.results)
                });
            }.bind(this)).catch(function (exception) {
                console.error(exception);
            });
    },

    getMoreButton: function () {
        var moreButton = this.next ?
            <button type="button" className="btn btn-default btn-block" onClick={this.loadItems}>{t('More')}</button>
            : undefined;
        return moreButton;
    }
};
