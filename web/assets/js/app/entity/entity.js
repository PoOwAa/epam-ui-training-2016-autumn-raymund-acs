/**
 * Class representing a single entity.
 */
var Entity = (function ($, Validation, Utils) {

    function Entity(id, email, created) {
        this.id = id;
        this.email = email || '';
        this._created = new Date(created);
        this.parseCreationDate(created);
    }

    /**
     *
     * @param \Date date
     */
    Entity.prototype.parseCreationDate = function(){
        var dateTime = Utils.extractDateAndTime(this._created);
        this.creationDate = dateTime.date;
        this.creationTime = dateTime.time;
    };

    Entity.prototype.getValidationErrors = function(){
        var errors = {};
        if (!Validation.isNotEmpty(this.email.trim())) {
            errors.email = 'Please provide an email address.';
        } else if (!Validation.isEmail(this.email.trim())) {
            errors.email = 'Please provide a valid email address.';
        }
        return $.isEmptyObject(errors) ? null : errors;
    };

    return Entity;

})(jQuery, Validation, Utils);