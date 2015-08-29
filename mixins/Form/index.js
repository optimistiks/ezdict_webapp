var $ = require('jquery');

module.exports = {
    serializeAsKeyValue: function () {
        return $(this.getDOMNode()).serializeArray().reduce(function (obj, formField) {
            obj[formField.name] = formField.value;
            return obj;
        }, {});
    }
};
