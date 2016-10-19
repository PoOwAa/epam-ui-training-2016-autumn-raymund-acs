/**
 * Module for messages page controller
 * Roles: Subscribing for UI and data storage events and execute the necessary storage and rendering methods.
 */
var MessageController = (function (messageView, storage, ToastController, utils, $) {

    function fetchTopic(topicId) {
        storage.getTopic(topicId).then(function (topic) {
            self.topic = topic;
            messageView.renderContainer(topic);
            fetchMessages();
        }, function () {
            console.log("Topic fetch failed.", arguments);
        });
    }

    function fetchMessages() {
        storage.getAllMessages(self.searchString, self.topic.id).then(function (messages) {
            self.messages = messages;
            messageView.clearAndRenderMessages(messages);
        }, function () {
            console.log("Message fetch failed.", arguments);
        });
    }

    function createMessage(formData) {
        var message = new Message(0, formData.email, new Date(), formData.text);
        if (message.getValidationErrors()) {
            messageView.renderValidationErrors(message.getValidationErrors());
            return;
        }

        messageView.clearValidationErrors();
        messageView.clearMessageForm();

        storage.createMessage(message, self.topic.id).done(function () {
            ToastController.show(ToastController.type.SUCCESS, "New message created.");
            clearSearchString();
            $('#search-form input').val('').blur();
            fetchMessages();
        }).fail(function () {
            ToastController.show(ToastController.type.ERROR, "Failed to add new message.");
            fetchMessages();
        });
    }

    function clearSearchString() {
        self.searchString = '';
    }

    var self = {
        messages: [],
        topic: null,
        searchString: "",

        init: function (topicId) {
            $('#search-form input').val(self.searchString);

            // Add a new message handler
            $('#main-container').on('submit', '#new-message-form', function (e) {
                var formData = utils.parseFormFields($(this));
                createMessage(formData);
                e.preventDefault();
            });

            // Type something in the search bar handler
            $('#search-form').on('keyup', 'input', function (e) {

                var searchString = $(this).val();

                // Delay the search, so it won't be executed while the user is typing.
                clearTimeout($(this).data("timeout"));
                $(this).data("timeout", setTimeout(function () {
                    self.searchString = searchString;
                    fetchMessages();
                }, 300));

                e.preventDefault();
            });

            // Check and display new messages in this topic
            //@Todo: register notifiers for new messages with the selected topicId
            storage.startCheckingNewMessages(topicId);
            //@Todo: subscribe for new messages event
            storage.newMessagesFound.subscribe(function (messages) {
                self.messages = messages;
                messageView.clearAndRenderMessages(messages);
            });

            fetchTopic(topicId);
        },

        destroy: function () {
            $('#main-container, #search-form').off('submit change keyup');
            storage.stopCheckingNewMessages();
            storage.newMessagesFound.unsubscribe(fetchMessages);
            clearSearchString();
        }
    };

    return self;

})(MessageView, Storage, ToastController, Utils, jQuery);


