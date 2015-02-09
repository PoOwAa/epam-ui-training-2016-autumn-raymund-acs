/**
 * Class representing a single message.
 */
var Message = (function () {

    function Message(options) {
        this.id = options.id;
        this.text = options.text;
        this.creationDate = options.creationDate;
        this.creationTime = options.creationTime;
        this.email = options.email;
    }

    return Message;

})();