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
        for (var i = 0; i < this.handlers.length; i++) {
            if (this.handlers[i] === handler) {
                this.handlers.splice(i, 1);
                return;
            }
        }
    };

    /**
     * Notifies the subscribers of the current event,
     * with the given parameters.
     *
     * @param {*} eventParams
     */
    Event.prototype.publish = function (eventParams) {
        for (var i = 0; i < this.handlers.length; i++) {
            this.handlers[i](eventParams);
        }
    };

    return Event;
})();