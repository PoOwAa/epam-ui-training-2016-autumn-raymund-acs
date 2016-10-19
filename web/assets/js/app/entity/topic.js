/**
 * Class representing a single topic.
 */
var Topic = (function (Base, validation, $) {

    function Topic(id, email, created, title) {
        Base.call(this, id, email, created, title);
        this.title = title;
    }

    Topic.prototype = Object.create(Base.prototype);
    Topic.prototype.constructor = Topic;

    Topic.prototype.getValidationErrors = function () {
        var errors = Base.prototype.getValidationErrors.call(this) || {};

        // Validate the topic title
        if (!validation.isNotEmpty(this.title.trim())) {
            errors.title = 'Please provide a title.';
        }

        return $.isEmptyObject(errors) ? null : errors;
    };

    return Topic;

})(Entity, Validation, jQuery);