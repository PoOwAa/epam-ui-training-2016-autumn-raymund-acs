/**
 * Module for topics page controller
 */
var TopicController = {};
var searchString = "";

TopicController.topics = [];

TopicController.init = function () {
    TopicView.renderContainer();

    // TODO: Fetch topics on keyup event in the search form

    fetchTopics();
};

fetchTopics = function() {
    // TODO: Implement method
};