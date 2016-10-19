/**
 * Module for updating the topics page UI
 */
var TopicView = (function (View, $) {

    /**
     * Creates new topic element.
     *
     * @private
     * @param {Topic|Object} topic
     * @returns {jQuery}
     */
    function getTopicElement(topic) {
        return $('<article class="tile topic">')
            .append(
                $('<a>').attr('href', '#/topics/' + topic.id).append(
                    $('<div class="content">').html(topic.title)
                )
            ).append(
                View.tileInfo(topic.creationDate, topic.creationTime, topic.email)
            );
    }

    /**
     * Creates the topic container element.
     *
     * @private
     * @returns {jQuery}
     */
    function getTopicContainer() {
        return $('<main class="clearfix content topics">')
            .attr('id', 'topics')
            .append(getTopicForm());
    }

    /**
     * Creates the form for adding message.
     *
     * @private
     * @returns {jQuery}
     */
    function getTopicForm() {
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
        var $errorBubble = $('<div>').addClass('error-bubble').attr('data-for', 'email');

        var $form = $('<form>')
            .addClass('new-topic-form')
            .addClass('content')
            .attr('id', 'new-topic-form')
            .append($textarea)
            .append(
                $('<div class="input-group">')
                    .append($input)
                    .append($errorBubble)
                    .append($submit)
            );
        return $('<article class="tile form">').append($form);
    }

    /**
     * Appends all topics to the root message element.
     *
     * @private
     * @param {Array.<Topic|Object>} topics
     * @param {jQuery} topicsEl
     */
    function renderTopics(topics, topicsEl) {
        topics.forEach(function (topic) {
            var newTopicEl = getTopicElement(topic);
            topicsEl.find('article:first').after(newTopicEl);
        });
    }

    return {
        renderContainer: function () {
            $('#main-container').html(getTopicContainer());
            $('#topics').show();
        },

        clearAndRenderTopics: function (topics) {
            var topicsEl = $('#topics');
            topicsEl.find('article:not(:first)').remove();
            renderTopics(topics, topicsEl);
        },

        renderValidationErrors: function (validationErrors) {
            this.clearValidationErrors();

            if (validationErrors.hasOwnProperty('title')) {
                $('#new-topic-form textarea[name="title"]').addClass('error');
            }

            if (validationErrors.hasOwnProperty('email')) {
                $('#new-topic-form input[name="email"]').addClass('error');
                $('.error-bubble[data-for="email"]').html(validationErrors.email).show();
            }
        },

        clearValidationErrors: function () {
            $('#new-topic-form .error-bubble').hide();
            $('#new-topic-form').find('input, textarea').removeClass('error');
        },

        clearTopicForm: function () {
            $('#new-topic-form').find('input[name="email"], textarea').val('');
        }
    };

})(View, jQuery);
