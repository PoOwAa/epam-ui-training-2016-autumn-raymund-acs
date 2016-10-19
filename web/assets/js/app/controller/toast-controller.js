/**
 * Module for the controller of the toast UI component
 */
var ToastController = (function ($) {
    var timeout;

    /**
     * Shows a new toast with the given type, message.
     * If it's shown calls the done callback.
     *
     * @private
     * @param {string} type
     * @param {string} msg
     * @param {function} [done]
     */
    function showToast(type, msg, done) {
        $(".toast")
            .removeClass()
            .addClass("toast")
            .addClass(type)
            .html(msg)
            .fadeIn('fast', done);
    }

    /**
     * Hides the current toast, than calls the done callback.
     *
     * @private
     * @param {function} [done]
     */
    function hideToast(done) {
        $(".toast").fadeOut('fast', done);
    }

    return {
        type: {
            SUCCESS: 'success',
            ERROR: 'error'
        },
        show: function (type, msg) {
            clearTimeout(timeout);
            timeout = setTimeout(hideToast, 5000);
            hideToast(function () {
                showToast(type, msg);
            });
        }
    };
})(jQuery);


