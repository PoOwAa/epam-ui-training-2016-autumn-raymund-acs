/**
 * Application entry point. Executed after all modules, classes and the HTML DOM is loaded.
 */
$(function () {
    AppController.init();
    TopicController.init();
    console.log("App started.");
    ToastController.show(ToastController.type.SUCCESS, "App started.");
});