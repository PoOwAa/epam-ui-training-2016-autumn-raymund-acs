/**
 * Module for form validation functions
 */
var Validation = (function () {
    return {
        /**
         * Checks whether the given input isn't a zero-length string.
         *
         * @param {string} input
         * @returns {boolean}
         */
        isNotEmpty: function (input) {
            return input.length > 0;
        },

        /**
         * Checks whether the given input is an e-mail address.
         *
         * @param {string} input
         * @returns {boolean}
         */
        isEmail: function (input) {
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input);
        }
    };
})();