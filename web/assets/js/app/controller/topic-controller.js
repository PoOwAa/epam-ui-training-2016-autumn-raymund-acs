/**
 * Module for topics page controller
 */
var TopicController = {};
var searchString = "";

TopicController.topics = [];

TopicController.init = function () {
    TopicView.renderContainer();

    // Type something in the search bar handler
    $('#search-form').on('keyup', 'input', function (e) {
        var searchValue = $(this).val();

        // Delay the search, so it won't be executed while the use is typing.
        clearTimeout($(this).data("timeout"));
        $(this).data("timeout", setTimeout(function () {
            searchString = searchValue;
            fetchTopics();
        }, 300));

        e.preventDefault();
    });

    // Add a new topic handler
    $('#main-container').on('submit', '#new-topic-form', function (e) {
        var formData = Utils.parseFormFields($(this));
        TopicController.createTopic(formData);
        e.preventDefault();
    });

    fetchTopics();
};

TopicController.createTopic = function (topic) {
    TopicView.clearTopicForm();

    Storage.createTopic(topic).done(function () {
        searchString = '';
        $('#search-form input').val('').blur();
        fetchTopics();
    }).fail(function () {
        fetchTopics();
    });
};

function fetchTopics() {
    Storage.getAllTopics(searchString).then(
        function (topics) {
            TopicController.topics = topics;
            TopicView.clearAndRenderTopics(topics);
        },
        function () {
            console.log("Topic fetch failed", arguments);
        }
    );
}

function fetchTopic(topicId) {
    Storage.getTopic(topicId).then(function (topic) {
        self.topic = topic;
        MessageView.renderContainer(topic);
        fetchMessages();
    }, function () {
        console.log("Topic fetch failed.", arguments);
    });
}