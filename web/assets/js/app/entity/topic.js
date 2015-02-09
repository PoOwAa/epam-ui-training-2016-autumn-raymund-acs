/**
 * Class representing a single topic.
 */
var Topic = (function () {

    function Topic(options) {
        this.id = options.id;
        this.title = options.title;
        this.creationDate = options.creationDate;
        this.creationTime = options.creationTime;
        this.email = options.email;
    }

    return Topic;

})();