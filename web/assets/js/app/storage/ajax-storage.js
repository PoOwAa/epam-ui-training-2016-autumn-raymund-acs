/**
 * Class for AJAX based storage implementation
 */
var AjaxStorageProvider = (function (utils, $) {

    function AjaxStorage() {
        BaseStorage.call(this);
    }


    AjaxStorage.prototype = Object.create(BaseStorage.prototype);
    AjaxStorage.prototype.constructor = AjaxStorage;


    var fetchNewMessagesTimer = null;
    var fetchNewTopicsTimer = null;
    var lastFetchedMessages = [];
    var lastFetchedTopics = [];


    AjaxStorage.prototype.getTopic = function (id) {
        return $.get("/forum/topic/" + encodeURIComponent(id)).then(function (data) {
            return deserializeTopic(data.data);
        });
    };

    AjaxStorage.prototype.createTopic = function (topic) {
        return $.post("/forum/topics", {
            title: topic.title,
            email: topic.email
        });
    };

    AjaxStorage.prototype.getAllTopics = function (searchString) {
        return $.get("/forum/topics", {
            params: {searchString: searchString}
        }).then(function (response) {
            var topics = [];

            response.data.forEach(function (item) {
                var topic = deserializeTopic(item);
                topics.push(topic);
            });

            topics.sort(function(a, b) {
                return b.id - a.id;
            });

            return topics;
        });
    };

    AjaxStorage.prototype.createMessage = function (message, topicId) {
        return $.post("/forum/topic/" + encodeURIComponent(topicId) + "/messages", {
            text: message.text,
            email: message.email
        });
    };

    AjaxStorage.prototype.getAllMessages = function (searchString, topicId) {
        return $.get("/forum/topic/" + encodeURIComponent(topicId) + "/messages", {
            params: {searchString: searchString}
        }).then(function (response) {
            var messages = [];
            response.data.forEach(function (item) {
                var message = deserializeMessage(item);
                messages.push(message);
            });

            messages.sort(function(a, b) {
                return b.id - a.id;
            });

            return messages;
        });
    };

    function deserializeTopic(data) {
        var dateTime = utils.extractDateAndTime(data.creationDate);
        return new Topic({
            id: data.id,
            title: data.title,
            creationDate: dateTime.date,
            creationTime: dateTime.time,
            email: data.email
        });
    }

    function deserializeMessage(data) {
        var dateTime = utils.extractDateAndTime(data.creationDate);
        return new Message({
            id: data.id,
            text: data.text,
            creationDate: dateTime.date,
            creationTime: dateTime.time,
            email: data.email
        });
    }

    AjaxStorage.prototype.startCheckingNewMessages = function (topicId) {
        var self = this;
        lastFetchedMessages = [];
        fetchNewMessagesTimer = setInterval(function () {
            self.getAllMessages("", topicId).then(function (messages) {
                var count = messages.length - lastFetchedMessages.length;
                if (count > 0) {
                    var added = messages.slice(messages.length - count);
                    lastFetchedMessages = messages;
                    self.newMessagesFound.publish(added);
                }
            });
        }, 10000);
    };

    AjaxStorage.prototype.stopCheckingNewMessages = function () {
        clearInterval(fetchNewMessagesTimer);
    };

    AjaxStorage.prototype.startCheckingNewTopics = function () {
        var self = this;
        lastFetchedTopics = [];
        fetchNewTopicsTimer = setInterval(function () {
            self.getAllTopics("").then(function (topics) {
                var count = topics.length - lastFetchedTopics.length;
                if (count > 0) {
                    var added = topics.slice(topics.length - count);
                    lastFetchedTopics = topics;
                    self.newTopicsFound.publish(added);
                }
            });
        }, 10000);
    };

    AjaxStorage.prototype.stopCheckingNewTopics = function () {
        clearInterval(fetchNewTopicsTimer);
    };

    return AjaxStorage;

});

