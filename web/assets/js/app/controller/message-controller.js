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
    console.log("Message controller initalized");
    fetchTopic(topicId);

    // TODO : submit
    $('#new-topic-form').on('submit', function(e) {
        var formData = Utils.parseFormFields($(this));
        MessageController.createMessage(formData);
        e.preventDefault();
        TopicView.cleanTopicForm();
        fetchTopics();
    });
};

MessageController.createMessage = function (message) {
    // TODO
    Storage.createMessage(message);
};
