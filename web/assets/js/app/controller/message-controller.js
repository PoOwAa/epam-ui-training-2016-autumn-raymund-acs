/**
 * Module for messages page controller
 */
var MessageController = {};

var self = {
    messages: [],
    topic: null,
    searchString: ""
};

MessageController.init = function (topicId) {
    $('#search-form input').val(self.searchString);

    // Add a new message handler
    $('#main-container').on('submit', '#new-message-form', function (e) {
        var formData = Utils.parseFormFields($(this));
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

    fetchTopic(topicId);
};

function createMessage(formData) {
    var message = {
        text: formData.text,
        email: formData.email
    };

    MessageView.clearMessageForm();

    Storage.createMessage(message, self.topic.id).done(function () {
        self.searchString = '';
        $('#search-form input').val('').blur();
        fetchMessages();
    }).fail(function () {
        fetchMessages();
    });
}

function fetchMessages() {
    Storage.getAllMessages(self.searchString, self.topic.id).then(function (messages) {
        self.messages = messages;
        MessageView.clearAndRenderMessages(messages);
    }, function () {
        console.log("Message fetch failed.", arguments);
    });
}
