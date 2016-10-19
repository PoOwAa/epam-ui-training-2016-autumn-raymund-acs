/**
 *  Class for listening and raising a custom event
 */
var Event = (function () {
    function Event() {
        /** @type {Array.<function>} */
        this.handlers = [];
    }

    /**
     * Subscribe with the given handler to the current event.
     *
     * @todo: implement; store the handler
     * @param {function} handler
     */
    Event.prototype.subscribe = function (handler) {
    };

    /**
     * Unsubscribe with the given handler from the current event.
     *
     * @todo: implement; search for the selected handler and remove it
     * @param {function} handler
     */
    Event.prototype.unsubscribe = function (handler) {

    };

    /**
     * Notifies the subscribers of the current event,
     * with the given parameters.
     *
     * @todo: implement; call every registered methods with the defined params
     * @param {*} eventParams
     */
    Event.prototype.publish = function (eventParams) {

    };

    return Event;
})();