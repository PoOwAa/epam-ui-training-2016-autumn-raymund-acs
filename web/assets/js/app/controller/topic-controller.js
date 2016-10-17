/**
 * Module for topics page controller
 */
var TopicController = {};
var searchString = "";

TopicController.topics = [];

TopicController.init = function () {
    TopicView.renderContainer();

    // TODO: Fetch topics on keyup event in the search form
    $('input[type="text"]', '.search-form').on('keyup', function() {
        fetchTopics($('input[type="text"], '.search-form'));
    });


};

fetchTopics = function(searchString) {
    // TODO: Implement method
    console.log(MemoryStorage.getAllTopics());
};