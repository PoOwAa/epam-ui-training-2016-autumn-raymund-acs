/**
 * Class representing a single message.
 */
var Message = (function (Base, validation, $) {

    function Message(id, email, created, text) {
        Base.call(this, id, email, created);
        this.text = text;
    }

    Message.prototype = Object.create(Base.prototype);
    Message.prototype.constructor = Message;

    Message.prototype.getValidationErrors = function () {
        var errors = Base.prototype.getValidationErrors.call(this) || {};

        // Validate the message text
        if (!validation.isNotEmpty(this.text.trim())) {
            errors.title = 'Please provide the message.';
        }

        return $.isEmptyObject(errors) ? null : errors;
    };

    return Message;

})(Entity, Validation, jQuery);