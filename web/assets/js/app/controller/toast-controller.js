/**
 * Module for the controller of the toast UI component
 */
var ToastController = {};
var timeout;

ToastController.type = {
    SUCCESS: 'success',
    ERROR: 'error'
};

/**
 * Shows a new toast with the given type, message.
 * If it's shown calls the done callback.
 *
 * @private
 * @param {string} type
 * @param {string} msg
 * @param {function} [done]
 */
ToastController.showToast = function (type, msg, done) {
    $(".toast")
        .removeClass()
        .addClass("toast")
        .addClass(type)
        .html(msg)
        .fadeIn('fast', done);
};

/**
 * Hides the current toast, than calls the done callback.
 *
 * @private
 * @param {function} [done]
 */
ToastController.hideToast = function (done) {
    $(".toast").fadeOut('fast', done);
};

ToastController.show = function (type, msg) {
    clearTimeout(timeout);
    ToastController.showToast(type, msg, function() {
        timeout = setTimeout(ToastController.hideToast, 5000);
    });
};