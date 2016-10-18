var Message = (function (Entity) {

    function Message(id, text, created, email) {
        Entity.call(this, id, email, created);
        this.text = text;

    };

    Message.prototype = Object.create(Entity.prototype);
    Message.prototype.constructor = Message;

    Message.prototype.getValidationErrors = function () {
        var error = Entity.prototype.getValidationErrors.call(this);
        if (error) {
            return error;
        }
        if (!Entity._isNotEmpty(this.text)) {
            return {
                error: "Please provide a message!"
            }
        }
        return null;
    };

    return Message;
})(Entity);