/**
 * Module for generic utility functions
 */
var Utils = (function () {
    return {
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
        },

        /**
         * Returns the date and time part of the given datetime.
         *
         * @param {Date|string|*} [date]
         * @returns {{date: string, time: string}}
         */
        extractDateAndTime: function (date) {
            date = new Date(date);
            return {
                date: date.getFullYear() + "." + ((date.getMonth() + 1 < 10) ? "0" : "") + (date.getMonth() + 1) + "." + ((date.getDate() < 10) ? "0" : "") + date.getDate(),
                time: ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes()
            };
        }
    };
})();