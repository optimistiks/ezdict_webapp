var i18n = require('i18next-client');
var config = require('../../../../config');

i18n.init(
    {
        load: 'current',
        useLocalStorage: true,
        lng: config.defaultLng,
        fallbackLng: false,
        ns: 'messages',
        resGetPath: '_locales/__lng__/__ns__.json'
    }
);

module.exports = i18n;
