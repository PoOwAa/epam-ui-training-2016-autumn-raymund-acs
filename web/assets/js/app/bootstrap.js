/**
 * Application entry point. Executed after all modules, classes and the HTML DOM is loaded.
 */
$(function () {
    AppController.init();
    console.log("App started.");

    function handleOnHashChange() {
        $('#main-container, #search-form').off('submit change keyup');
        $('#search-form input').val('').blur();
        var fragment = location.hash.replace(/\/$/, '').replace(/^\//, '');
        var topicRx = /topics\/(.*)/;
        if (topicRx.test(fragment)) {
            // A topic is opened, we need to show the messages
            var topicId = fragment.match(topicRx)[1];
            MessageController.init(topicId);
        } else {
            // The main page (topics) is opened
            TopicController.init();
        }
    }

    window.onhashchange = handleOnHashChange;
    handleOnHashChange();
});