/**
 * Class for AJAX based storage implementation
 */
var AjaxStorage = (function (utils, $) {

    function AjaxStorage() {
        BaseStorage.call(this);
    }


    AjaxStorage.prototype = Object.create(BaseStorage.prototype);
    AjaxStorage.prototype.constructor = AjaxStorage;


    var fetchNewMessagesTimer = null;
    var fetchNewTopicsTimer = null;
    var lastFetchedMessages = [];
    var lastFetchedTopics = [];


    /**
     * Get the specified topic from the server
     * GET request to "/forum/topic/{id}" - this will return an object
     * If success resolves with a new Topic
     *
     * @todo: implement
     * @param int id
     * @returns Promise
     */
    AjaxStorage.prototype.getTopic = function (id) {

    };

    /**
     * Creates a new topic to store it on the server
     * POST request to "/forum/topics"
     * Required fields: title, email
     *
     * @todo: implement
     * @param Topic topic
     * @returns Promise
     */
    AjaxStorage.prototype.createTopic = function (topic) {

    };

    /**
     * Load all topics from the server
     * GET request to "/forum/topics" - this will return an array of objects
     * Promise will be resolved with array of Topic objects
     *
     * @todo: implement
     * @param string searchString
     * @returns Promise
     */
    AjaxStorage.prototype.getAllTopics = function (searchString) {

    };

    /**
     * Creates a new message in a selected topic
     * POST request to"/forum/topic/{topicId}/messages"
     * Params: text, email
     *
     * @todo: implement
     * @param Message message
     * @param int topicId
     * @returns Promise
     */
    AjaxStorage.prototype.createMessage = function (message, topicId) {

    };

    /**
     * Load all messages from a selected topic
     * GET request towards "/forum/topic/{topicId}/message" - this will return an array of objects
     * Params: searchString
     * Promise has to be resolved by a new array of Message objects
     *
     * @todo: implement
     * @param string searchString
     * @param int topicId
     * @returns Promise
     */
    AjaxStorage.prototype.getAllMessages = function (searchString, topicId) {

    };

    /**
     * Helper function to create a topic from the selected data
     *
     * @param object data
     * @returns Topic
     */
    function deserializeTopic(data) {
        return new Topic(data.id, data.email, data.creationDate, data.title);
    }

    /**
     * Helper class to create a Message object from params
     *
     * @param object data
     * @returns Message
     */
    function deserializeMessage(data) {
        return new Message(data.id, data.email, data.creationDate, data.text);
    }

    AjaxStorage.prototype.startCheckingNewMessages = function (topicId) {
        var self = this;
        lastFetchedMessages = [];
        fetchNewMessagesTimer = setInterval(function () {
            //@todo: implement
            //use getAllMessages method with the topicId and an empty search
            //if the loaded messages length differs from last lastFetchedMessages, notify the newMessagesFound object with the new topics
        }, 10000);
    };

    AjaxStorage.prototype.stopCheckingNewMessages = function () {
        clearInterval(fetchNewMessagesTimer);
    };

    AjaxStorage.prototype.startCheckingNewTopics = function () {
        var self = this;
        lastFetchedTopics = [];
        fetchNewTopicsTimer = setInterval(function () {
            //@todo: implement
            //use getAllTopics and if the loaded topics length differs from the length of the last elements, notify newTopicsFound event
        }, 10000);
    };

    AjaxStorage.prototype.stopCheckingNewTopics = function () {
        clearInterval(fetchNewTopicsTimer);
    };

    return AjaxStorage;

})(Utils, jQuery);