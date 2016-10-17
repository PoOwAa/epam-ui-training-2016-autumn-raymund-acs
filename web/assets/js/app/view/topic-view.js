/**
 * Module for updating the topics page UI
 */
var TopicView =  { };

/**
 * Creates new topic element.
 *
 * @private
 * @param {Topic|Object} topic
 * @returns {jQuery}
 */
getTopicElement = function(topic) {
    // TODO: Implement method
};

/**
 * Creates the topic container element.
 *
 * @private
 * @returns {jQuery}
 */
getTopicContainer = function() {
    // TODO: Implement method
    return $('.main-container').append(
        $('<main>', {id : 'topics', class : 'clearfix content topics'})
    );
};

/**
 * Creates the form for adding message.
 *
 * @private
 * @returns {jQuery}
 */
getTopicForm = function() {
    // TODO: Implement method
    $('.main-container main').append(
        $('<article>', {class : "tile form"})
    );
    $('.form').append(
        $('<form>', {id : "new-topic-form", class : "new-topic-form content"})
    );
    $('.new-topic-form').append(
        $('<textarea>', {name : "title", tabindex : "1", placeholder : "Type your topic's name here"})
    ).append(
        $('<div>', {class : "input-group"})
    );
    $('.input-group').append(
        $('<input>', {name : "email", type : "email", placeholder : "Type your email here", tabindex : 2, id : "new-topic-email", class : "new-topic-email"})
    ).append(
        $('<span>')
    );
    $('.input-group span').append(
        $('<button>', {type : "submit", tabindex : "3", class : "submit-button", text : "Add"})
    );


};

/**
 * Appends all topics to the root message element.
 *
 * @private
 * @param {Array.<Topic|Object>} topics
 * @param {jQuery} topicsEl
 */
TopicView.renderTopics = function(topics, topicsEl) {
    // TODO: Impelment method

};

TopicView.renderContainer = function () {
    // TODO: Implement method
    console.log('Render container');
    getTopicContainer();
    console.log('Render form');
    getTopicForm();

};

TopicView.clearAndRenderTopics = function (topics) {
    // TODO: Implement method

};