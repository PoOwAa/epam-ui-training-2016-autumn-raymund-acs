/**
 * Module for topics page controller
 * Roles: Subscribing for UI and data storage events and execute the necessary storage and rendering methods.
 */
var TopicController = (function (topicView, storage, ToastController, utils, $) {

    function fetchTopics() {
        storage.getAllTopics(self.searchString).then(
            function (topics) {
                self.topics = topics;
                topicView.clearAndRenderTopics(topics);
            },
            function () {
                console.log("Topic fetch failed", arguments);
            }
        );
    }

    function createTopic(formData) {
        var topic = new Topic(self.topics.length + 1, formData.email, new Date(), formData.title);
        if (topic.getValidationErrors()) {
            topicView.renderValidationErrors(topic.getValidationErrors());
            return;
        }

        topicView.clearValidationErrors();
        topicView.clearTopicForm();

        storage.createTopic(topic).done(function () {
            ToastController.show(ToastController.type.SUCCESS, "New topic created.");
            self.searchString = '';
            $('#search-form input').val('').blur();
            fetchTopics();
        }).fail(function () {
            ToastController.show(ToastController.type.ERROR, "Failed to create new topic.");
            fetchTopics();
        });
    }

    var self = {
        topics: [],
        searchString: "",

        init: function () {
            $('#search-form input').val(self.searchString);

            topicView.renderContainer();

            // Add a new topic handler
            $('#main-container').on('submit', '#new-topic-form', function (e) {
                var formData = utils.parseFormFields($(this));
                createTopic(formData);
                e.preventDefault();
            });

            // Type something in the search bar handler
            $('#search-form').on('keyup', 'input', function (e) {

                var searchString = $(this).val();

                // Delay the search, so it won't be executed while the use is typing.
                clearTimeout($(this).data("timeout"));
                $(this).data("timeout", setTimeout(function () {
                    self.searchString = searchString;
                    fetchTopics();
                }, 300));

                e.preventDefault();
            });

            // Check and display new topics
            storage.startCheckingNewTopics();
            storage.newTopicsFound.subscribe(function (topics) {
                self.topics = topics;
                topicView.clearAndRenderTopics(topics);
            });

            fetchTopics();
        },
        destroy: function () {
            $('#main-container, #search-form').off('submit keyup');
            storage.stopCheckingNewTopics();
            storage.newTopicsFound.unsubscribe(fetchTopics);
        }
    };

    return self;
})(TopicView, Storage, ToastController, Utils, jQuery);


