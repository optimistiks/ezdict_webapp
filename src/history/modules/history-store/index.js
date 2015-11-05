var util = require('util');
var EventEmitter = require('events').EventEmitter;
var dispatcher = require('../../../common/modules/dispatcher');
var api = require('../../../common/modules/api');
var assign = require('object-assign');


var historyStore = assign({}, EventEmitter.prototype, {

    page: 1,

    items: [],

    getAll () {
        return this.items;
    },

    getPage () {
        return this.page;
    },

    load () {

        if (this.page === null) {
            return;
        }

        api.getTranslationHistory(this.page)

            .then((response) => {

                if (response.next) {
                    ++this.page;
                } else {
                    this.page = null;
                }
                this.items = this.items.concat(response.results);
                this.emit('change');

            })

            .catch((exception) => console.error(exception));

    }

});

dispatcher.register(function (payload) {

    switch (payload.eventName) {

        case 'history-load':
            historyStore.load();
            break;

    }
    return true; // Needed for Flux promise resolution
});

module.exports = historyStore;
