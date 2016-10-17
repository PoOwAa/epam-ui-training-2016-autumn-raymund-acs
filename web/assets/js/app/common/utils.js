/**
 * Module for generic utility functions
 */
var Utils = {
    /**
     * Returns the fields and current values of the given form.
     *
     * @param {jQuery} form
     * @returns {object}
     */
    parseFormFields: function (form) {
        var values = {};
        form.serializeArray().forEach(function (field) {
            values[field.name] = field.value;
        });
        return values;
    }
};