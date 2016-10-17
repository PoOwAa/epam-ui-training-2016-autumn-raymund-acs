/**
 * Application entry point. Executed after all modules, classes and the HTML DOM is loaded.
 */
// TODO: Init application
// TODO: Show a toast message when app started

$(function(){
    AppController.init();
    ToastController.show('success', 'App initialized');
    TopicController.init();
});