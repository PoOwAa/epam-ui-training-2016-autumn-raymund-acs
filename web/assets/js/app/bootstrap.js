/**
 * Application entry point. Executed after all modules, classes and the HTML DOM is loaded.
 */
$(function () {
    AppController.init();
    console.log("App started.");

    function handleOnHashChange() {
        /*$('#main-container, #search-form').off('submit change keyup');
        var fragment = location.hash.replace(/\/$/, '').replace(/^\//, '');
        var topicRx = /topics\/(.*)/;*/
        TopicController.init();
    }

    window.onhashchange = handleOnHashChange;
    handleOnHashChange();
});