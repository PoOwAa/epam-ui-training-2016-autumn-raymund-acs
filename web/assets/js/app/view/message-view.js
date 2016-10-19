/**
 * Module for updating the messages page UI
 */
var MessageView = (function (View, $) {

    /**
     * Creates new message element based on the given model.
     *
     * @private
     * @param {Message|Object} message
     * @returns {jQuery}
     */
    function getMessageElement(message) {
        return $('<article class="tile">')
            .append(
                $('<div class="content">').html(message.text)
            ).append(
                View.tileInfo(message.creationDate, message.creationTime, message.email)
            );
    }

    /**
     * Creates new message-container element based on the given model.
     *
     * @private
     * @param {Topic|Object} topic
     * @returns {jQuery}
     */
    function getMessageContainer(topic) {
        return $('<main class="messages">')
            .attr('id', 'messages')
            .append(
                $('<div class="topic-header">').append(
                    $('<div class="content">').html(topic.title)
                )
            ).append(
                View.tileInfo(topic.creationDate, topic.creationTime, topic.email, true)
            ).append(
                $('<div class="content">')
                    .append(getTopicForm())
                    .append($('<div class="message-feed clearfix">'))
            );
    }

    /**
     * Creates the form for adding message.
     *
     * @private
     * @returns {jQuery}
     */
    function getTopicForm() {
        var $textarea = $('<textarea>').attr({
            name: 'text',
            placeholder: 'Type your message here...',
            tabindex: 1
        });
        var $submit = $('<span>').append(
            $('<button>').attr({
                type: 'submit',
                tabindex: 3
            }).addClass('submit-button').html('Add comment')
        );
        var $input = $('<input>').attr({
            name: 'email',
            type: 'email',
            placeholder: 'Type your email here...',
            tabindex: 2
        }).addClass('new-message-email');
        var $errorBubble = $('<div>').addClass('error-bubble').attr('data-for', 'email');
        var $form = $('<form>')
            .addClass('new-message-form')
            .attr('id', 'new-message-form')
            .append($textarea)
            .append(
                $('<div class="input-group">')
                    .append($input)
                    .append($errorBubble)
                    .append($submit)
            );
        return $('<article class="tile form">').append(
            $('<div class="content">').append($form)
        );
    }

    /**
     * Appends all messages to the root message element.
     *
     * @private
     * @param {Array.<Message|Object>} messages
     * @param {jQuery} messagesEl
     */
    function renderMessages(messages, messagesEl) {
        messages.forEach(function (message) {
            var newMessageEl = getMessageElement(message);
            messagesEl.find('.message-feed').prepend(newMessageEl);
        });
    }

    return {
        renderContainer: function (topic) {
            $('#main-container').html(getMessageContainer(topic));
            $('#messages').show();
        },

        clearAndRenderMessages: function (messages) {
            var messagesEl = $('#messages');
            messagesEl.find('.message-feed').html('');
            renderMessages(messages, messagesEl);
        },

        renderValidationErrors: function (validationErrors) {
            this.clearValidationErrors();

            if (validationErrors.hasOwnProperty('title')) {
                $('#new-message-form textarea[name="text"]').addClass('error');
            }

            if (validationErrors.hasOwnProperty('email')) {
                $('#new-message-form input[name="email"]').addClass('error');
                $('.error-bubble[data-for="email"]').html(validationErrors.email).css('display', 'inline-table');
            }
        },

        clearValidationErrors: function () {
            $('#new-message-form .error-bubble').hide();
            $('#new-message-form').find('input, textarea').removeClass('error');
        },

        clearMessageForm: function () {
            $('#new-message-form').find('input[name="email"], textarea').val('');
        }
    };

})(View, jQuery);
