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
        var topic = {};
        //TODO use form.serializeArray() to get each field's name and value
        $.each(form.serializeArray(), function(index, field) {
            topic[field.name] = field.value;
        });

        return topic;
    }
};