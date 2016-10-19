/**
 * Class for a non persistent storage implementation
 */
var MemoryStorage = (function (utils, $) {

    function MemoryStorage() {
        BaseStorage.call(this);
    }

    MemoryStorage.prototype = Object.create(BaseStorage.prototype);
    MemoryStorage.prototype.constructor = MemoryStorage;

    var topics = null;
    var messages = {};

    MemoryStorage.prototype.getTopic = function (id) {
        var deferred = $.Deferred();

        function topicByID() {
            var topic = null;
            for (var i = 0; i < topics.length; i++) {
                if (topics[i].id == id) {
                    topic = topics[i];
                }
            }
            if (topic) {
                deferred.resolve(topic);
            } else {
                deferred.reject("Topics not found");
            }
        }

        if (topics) {
            topicByID();
        } else {
            $.getJSON('/topics.json', function (topicsData) {
                topics = [];
                topicsData.forEach(function(topic){
                    topics.push(new Topic(topics.length+1, topic.email, new Date(), topic.title));
                });
                topicByID();
            });
        }
        return deferred.promise();
    };

    MemoryStorage.prototype.createTopic = function (topic) {
        var deferred = $.Deferred();
        topic = new Topic(topics.length + 1, topic.email, new Date(), topic.title);
        messages[topic.id] = [];
        topics.push(topic);
        deferred.resolve();
        return deferred.promise();
    };

    MemoryStorage.prototype.getAllTopics = function (searchString) {
        var deferred = $.Deferred();

        function topicsByPhrase() {
            var result = [];
            if (searchString) {
                searchString = searchString.toLocaleLowerCase();
                for (var i = 0; i < topics.length; i++) {
                    if (topics[i].title.toLocaleLowerCase().indexOf(searchString) != -1) {
                        result.push(topics[i]);
                    }
                }
            } else {
                result = topics;
            }
            deferred.resolve(result);
        }

        if (topics) {
            topicsByPhrase();
        } else {
            $.getJSON('/topics.json', function (topicsData) {
                topics = [];
                topicsData.forEach(function(topicData, index){
                    topics.push(new Topic(index, topicData.email, topicData.creationDate, topicData.title));
                });
                topicsByPhrase();
            });
        }

        return deferred.promise();
    };

    MemoryStorage.prototype.createMessage = function (message, topicId) {
        var deferred = $.Deferred();
        message = new Message(messages[topicId].length + 1, message.email, new Date(), message.text);
        messages[topicId].push(message);
        deferred.resolve();
        return deferred.promise();
    };

    MemoryStorage.prototype.getAllMessages = function (searchString, topicId) {
        var deferred = $.Deferred();
        var self = this;

        function messagesOfTopic() {
            if (messages[topicId]) {
                var ms = messages[topicId];
                var result = [];
                if (searchString) {
                    searchString = searchString.toLocaleLowerCase();
                    for (var i = 0; i < ms.length; i++) {
                        if (ms[i].text.toLocaleLowerCase().indexOf(searchString) != -1) {
                            result.push(ms[i]);
                        }
                    }
                } else {
                    result = ms;
                }
                deferred.resolve(result);
            } else {
                deferred.reject("Topics not found");
            }
        }

        if (!$.isEmptyObject(messages)) {
            messagesOfTopic();
        } else {
            $.getJSON('/messages.json', function (messagesData) {
                messages = {};
                for (var topic in messagesData) {
                    if (!messages.hasOwnProperty(topic)) {
                        messages[topic] = [];
                    }
                    messagesData[topic].forEach(function(msg){
                        self.createMessage(msg, topic);
                    });
                }
                messagesOfTopic();
            });
        }

        return deferred.promise();
    };

    MemoryStorage.prototype.startCheckingNewMessages = function (topicId) {
        // nothing to do
    };

    MemoryStorage.prototype.stopCheckingNewMessages = function () {
        // nothing to do
    };

    MemoryStorage.prototype.startCheckingNewTopics = function () {
        // nothing to do
    };

    MemoryStorage.prototype.stopCheckingNewTopics = function () {
        // nothing to do
    };

    return MemoryStorage;

})(Utils, jQuery);