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
    return $('<article class="tile topic">')
        .append(
        $('<a>').attr('href', '#/topics/' + topic.id).append(
            $('<div class="content">').html(topic.title)
        )
    ).append(
        View.tileInfo(topic.creationDate, topic.creationTime, topic.email)
    );
};

/**
 * Creates the topic container element.
 *
 * @private
 * @returns {jQuery}
 */
getTopicContainer = function() {
    return $('<main class="clearfix content topics">')
        .attr('id', 'topics')
        .append(getTopicForm());
};

/**
 * Creates the form for adding message.
 *
 * @private
 * @returns {jQuery}
 */
getTopicForm = function() {
    var $textarea = $('<textarea>').attr({
        name: 'title',
        placeholder: 'Type your topic\'s name here...',
        tabindex: 1
    });
    var $submit = $('<span>').append(
        $('<button>').attr({
            type: 'submit',
            tabindex: 3
        }).addClass('submit-button').html('Add')
    );
    var $input = $('<input>').attr({
        name: 'email',
        type: 'email',
        placeholder: 'Type your email here...',
        tabindex: 2,
        id: 'new-topic-email'
    }).addClass('new-topic-email');
    var $form = $('<form>')
        .addClass('new-topic-form')
        .addClass('content')
        .attr('id', 'new-topic-form')
        .append($textarea)
        .append(
        $('<div class="input-group">')
            .append($input)
            .append($submit)
    );
    return $('<article class="tile form">').append($form);
};

/**
 * Appends all topics to the root message element.
 *
 * @private
 * @param {Array.<Topic|Object>} topics
 * @param {jQuery} topicsEl
 */
TopicView.renderTopics = function(topics, topicsEl) {
    topics.forEach(function (topic) {
        var newTopicEl = getTopicElement(topic);
        topicsEl.find('article:last').after(newTopicEl);
    });
};

TopicView.renderContainer = function () {
    $('#main-container').html(getTopicContainer());
    $('#topics').show();
};

TopicView.clearAndRenderTopics = function (topics) {
    var topicsEl = $('#topics');
    topicsEl.find('article:not(:first)').remove();
    TopicView.renderTopics(topics, topicsEl);
};