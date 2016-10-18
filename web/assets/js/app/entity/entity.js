var Entity = (function () {

    function Entity(id, email, created) {
        this.id = id;
        this.email = email;
        this._created = created;
        this.setDate(created);
    }

    Entity.prototype.setDate = function (created) {
        created = new Date(created);

        // 2016.10.18.
        this.creationDate = [
            created.getFullYear(),
            created.getMonth() + 1,
            created.getDate()
        ].join('.');
        // 18:33
        this.creationTime = [
            created.getHours(),
            created.getMinutes()
        ].join(':');
    };


    Entity.prototype.getValidationErrors = function () {
        if (!Entity._isNotEmpty(this.email)) {
            return {
                error : "Please provide an email address!"
            };
        }
        if (!Entity._isEmail(this.email)) {
            return {
                error : "Please provide a vaild email address!"
            };
        }
        return null;
    };

    Entity._isNotEmpty = function(text) {
        return !!(text);
    };

    Entity._isEmail = function(email) {
        return /^.+\@.+\..+$/.text(email);
    };


    return Entity;

})();