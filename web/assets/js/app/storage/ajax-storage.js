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
     * @param int id
     * @returns Promise
     */
    AjaxStorage.prototype.getTopic = function (id) {
        return $.get('/forum/topic/' + id).then(function (topic) {
            console.log(topic);
            return deserializeTopic(topic);
        })
    };

    /**
     * Creates a new topic to store it on the server
     * POST request to "/forum/topics"
     * Required fields: title, email
     *
     * @param Topic topic
     * @returns Promise
     */
    AjaxStorage.prototype.createTopic = function (topic) {
        return $.post('/forum/topics', {
            title : topic.title,
            email : topic.email
        });
    };

    /**
     * Load all topics from the server
     * GET request to "/forum/topics" - this will return an array of objects
     * Promise will be resolved with array of Topic objects
     *
     * @param string searchString
     * @returns Promise
     */
    AjaxStorage.prototype.getAllTopics = function (searchString) {
        return $.get('/forum/topics?searchString=' + searchString).then(function (topics) {
            return topics.map(function (topicData) {
                return deserializeTopic(topicData);
            });
        });
    };

    /**
     * Creates a new message in a selected topic
     * POST request to"/forum/topic/{topicId}/messages"
     * Params: text, email
     *
     * @param Message message
     * @param int topicId
     * @returns Promise
     */
    AjaxStorage.prototype.createMessage = function (message, topicId) {
        return $.post('/forum/topic/' + topicId + '/messages', {
            text    :   message.text,
            email   :   message.email
        });
    };

    /**
     * Load all messages from a selected topic
     * GET request towards "/forum/topic/{topicId}/message" - this will return an array of objects
     * Params: searchString
     * Promise has to be resolved by a new array of Message objects
     *
     * @param string searchString
     * @param int topicId
     * @returns Promise
     */
    AjaxStorage.prototype.getAllMessages = function (searchString, topicId) {
        return $.get('/forum/topic/' + topicId + '/messages?searchString=' + searchString).then(function (messages) {
            console.log(messages);
            return messages.map(deserializeMessage);
        });
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
            //use getAllMessages method with the topicId and an empty search
            //if the loaded messages length differs from last lastFetchedMessages, notify the newMessagesFound object with the new topics
            self.getAllMessages('', topicId).then(function (messageList) {
                if (lastFetchedMessages.length != messageList.length) {
                    lastFetchedMessages = messageList;
                    self.newMessagesFound.publish(messageList);
                }
            })
        }, 1000);
    };

    AjaxStorage.prototype.stopCheckingNewMessages = function () {
        clearInterval(fetchNewMessagesTimer);
    };

    AjaxStorage.prototype.startCheckingNewTopics = function () {
        var self = this;
        lastFetchedTopics = [];
        fetchNewTopicsTimer = setInterval(function () {
            //use getAllTopics and if the loaded topics length differs from the length of the last elements, notify newTopicsFound event
            self.getAllTopics("").then(function (topicsList) {
                if (lastFetchedTopics.length != topicsList.length) {
                    lastFetchedTopics = topicsList;
                    self.newTopicsFound.publish(topicList);
                }
            });

        }, 1000);
    };

    AjaxStorage.prototype.stopCheckingNewTopics = function () {
        clearInterval(fetchNewTopicsTimer);
    };

    return AjaxStorage;

})(Utils, jQuery);