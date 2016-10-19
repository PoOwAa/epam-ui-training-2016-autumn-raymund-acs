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
     * @param {function} handler
     */
    Event.prototype.subscribe = function (handler) {
        this.handlers.push(handler);
    };

    /**
     * Unsubscribe with the given handler from the current event.
     *
     * @param {function} handler
     */
    Event.prototype.unsubscribe = function (handler) {
        this.handlers = this.handlers.filter(function (actualHandler) {
            return handler != actualHandler;
        });
    };

    /**
     * Notifies the subscribers of the current event,
     * with the given parameters.
     *
     * @param {*} eventParams
     */
    Event.prototype.publish = function (eventParams) {
        this.handlers.forEach(function (handler) {
            handler(eventParams);
        });
    };

    return Event;
})();