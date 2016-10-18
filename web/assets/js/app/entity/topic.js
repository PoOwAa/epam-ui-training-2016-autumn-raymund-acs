var Topic = (function (Entity, Message) {

    function Topic(id, title, created, email, messages) {
        Entity.call(this, id, email, created);
        this.title = title;
        this.messages = [];
        if (messages) { this.setMessages(messages); }
    }

    Topic.prototype = Object.create(Entity.prototype);
    Topic.prototype.constructor = Topic;

    Topic.prototype.setMessages = function (messages) {

        var that = this;

        if (!(messages instanceof Array)) {
            messages = [messages];
        }

        messages.forEach(function (message, index) {
            if (!(message instanceof Message)) {
                message = new Message(that.id + "_" + index, message, that._created, that.email);
            }

            that.messages.push(message);
        });
    };

    Topic.prototype.getValidationErrors = function () {
        var error = Entity.prototype.getValidationErrors.call(this);
        if (error) {
            return error;
        }
        if (!Entity._isNotEmpty(this.title)) {
            return {
                error   :   "Please provide a title!"
            }
        }
        return null;
    };

    return Topic;

})(Entity, Message);