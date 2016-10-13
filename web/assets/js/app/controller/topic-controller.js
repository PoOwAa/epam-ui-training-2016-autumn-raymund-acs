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

    fetchTopics();
};

fetchTopics = function() {
    Storage.getAllTopics(searchString).then(
        function (topics) {
            TopicController.topics = topics;
            TopicView.clearAndRenderTopics(topics);
        },
        function () {
            console.log("Topic fetch failed", arguments);
        }
    );
};