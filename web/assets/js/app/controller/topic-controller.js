/**
 * Module for topics page controller
 */
var TopicController = {};
var searchString = "";

TopicController.topics = [];

TopicController.init = function() {
    TopicView.renderContainer();

    // Type something in the search bar handler
    $('#search-form').on('keyup', 'input', function(e) {
        var searchValue = $(this).val();

        // Delay the search, so it won't be executed while the use is typing.
        clearTimeout($(this).data("timeout"));
        $(this).data("timeout", setTimeout(function() {
            searchString = searchValue;
            fetchTopics();
        }, 300));

        e.preventDefault();
    });

    $('#main-container').on('submit', '#new-topic-form', function(e) {
        var formData = Utils.parseFormFields($(this));
        TopicController.createTopic(formData);
        e.preventDefault();
    });

    fetchTopics();
};

TopicController.createTopic = function(topic) {
    Storage.createTopic(topic);
    setTimeout(fetchTopics(), 1000);
};

function fetchTopics() {
    Storage.getAllTopics(searchString).then(
        function(topics) {
            TopicController.topics = topics;
            TopicView.clearAndRenderTopics(topics);
        },
        function() {
            console.log("Topic fetch failed", arguments);
        }
    );
}

function fetchTopic(id) {
    Storage.getTopic(id).then(
        function(topic) {
            MessageView.renderContainer(topic)
        },
        function() {
            console.log("Topic fetch failed", arguments);
        }
    );
}