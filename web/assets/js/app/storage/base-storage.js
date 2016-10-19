/**
 * Abstract class for entity loading and creation.
 */
var BaseStorage = (function () {

    function BaseStorage() {
        this.newTopicsFound = new Event();
        this.newMessagesFound = new Event();
    }

    BaseStorage.prototype.getTopic = function (id) {
    };

    BaseStorage.prototype.createTopic = function (topic) {
    };

    BaseStorage.prototype.getAllTopics = function (searchString) {
    };

    BaseStorage.prototype.createMessage = function (message, topicId) {
    };

    BaseStorage.prototype.getAllMessages = function (searchString, topicId) {
    };

    BaseStorage.prototype.startCheckingNewMessages = function (topicId) {
    };

    BaseStorage.prototype.stopCheckingNewMessages = function () {
    };

    BaseStorage.prototype.startCheckingNewTopics = function () {
    };

    BaseStorage.prototype.stopCheckingNewTopics = function () {
    };

    return BaseStorage;

})();