/**
 * Application entry point. Executed after all modules, classes and the HTML DOM is loaded.
 */
$(function () {
    console.log("App started.");

    AppController.init();

    function handleOnHashChange() {
        var fragment = location.hash.replace(/\/$/, '').replace(/^\//, '');
        var topicRx = /topics\/(.*)/;
        if (topicRx.test(fragment)) {
            // A topic is opened, we need to show the messages
            var topicId = fragment.match(topicRx)[1];
            MessageController.destroy();
            TopicController.destroy();
            MessageController.init(topicId);
        } else {
            // The main page (topics) is opened
            MessageController.destroy();
            TopicController.destroy();
            TopicController.init();
        }
    }

    window.onhashchange = handleOnHashChange;
    handleOnHashChange();
});