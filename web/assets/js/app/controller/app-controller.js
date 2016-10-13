/**
 * Module for application controller. Contains logic shared between pages.
 */
var AppController = {
    init: function() {
        var searchFormInput = $('#search-form').find('input');

        // When clicked on search in small view: Hide logo and expand input field
        searchFormInput.on('focus', function(){
            $('header .logo').addClass('hide-on-small-screen');
            searchFormInput.parent().addClass('focused').end().addClass('focused');
        });

        // When clicked outside of search in small view: Show logo and collapse input field.
        // It preserves the field expanded if the field is not empty.
        searchFormInput.on('blur', function(){
            if (searchFormInput.val().trim().length === 0) {
                $('header .logo').removeClass('hide-on-small-screen');
                searchFormInput.parent().removeClass('focused').end().removeClass('focused');
            }
        });
    }
};