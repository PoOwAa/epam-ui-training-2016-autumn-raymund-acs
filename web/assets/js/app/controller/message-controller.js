/**
 * Module for messages page controller
 */
var MessageController = {};

var self = {
    messages: [],
    topic: null,
    searchString: ""
};

MessageController.init = function (topicId) {
    fetchTopic(topicId);
};
