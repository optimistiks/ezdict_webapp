var moment = require('moment');

module.exports = function (date) {
    return moment(date).format('DD.MM.YYYY HH:mm');
};