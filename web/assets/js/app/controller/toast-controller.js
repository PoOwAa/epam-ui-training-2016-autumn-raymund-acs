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
    // TODO: Implement method
    //console.log('Toast type: ' + type, ' msg: ' + msg);
    $('.toast').addClass(type).text(msg).fadeIn('slow', done);
};

/**
 * Hides the current toast, than calls the done callback.
 *
 * @private
 * @param {function} [done]
 */
ToastController.hideToast = function (done) {
    // TODO: Implement method
    //console.log('Toast fadeOut');
    $('.toast').removeClass().text('').fadeOut('slow', done);
};

ToastController.show = function (type, msg) {
    clearTimeout(timeout);
    ToastController.showToast(type, msg, function() {
        timeout = setTimeout(ToastController.hideToast, 5000);
    });
};