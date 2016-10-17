/**
 * Module for application controller. Contains logic shared between pages.
 */
var AppController = {
    init: function() {
        //console.log('AppController init');
        // When clicked on search in small view: Hide logo and expand input field
        // TODO: Implement focus event handler
        $('input[type="text"]', '.search-form').on('focus', function() {
            //console.log('Focus search...');
            $('.logo').addClass('hide-on-small-screen');  // No Forum Logo for you today!
            $('.search-form').addClass('focused');
        });

        // When clicked outside of search in small view: Show logo and collapse input field.
        // It preserves the field expanded if the field is not empty.
        // TODO: Implement blur event handler
        $('input[type="text"]', '.search-form').on('blur', function() {
            //console.log('Blur search...');
            //console.log('input length: ' + $(this).val().length);
            if ($(this).val().length == 0) {
                setTimeout(function() {$('.logo').removeClass('hide-on-small-screen');}, 500);
                $('.search-form').removeClass('focused');
            }
        });
    }
};