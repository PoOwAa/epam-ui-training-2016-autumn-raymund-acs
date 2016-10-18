/**
 * Class for AJAX based storage implementation
 */
var AjaxStorage = {
    getAllTopics: function(searchString) {
        return $.get("/forum/topics", {
            searchString: searchString
        }).then(function(data) {
            var topics = [];

            data.forEach(function(item) {
                var topic = new Topic(item.id, item.title, item.creationDate, item.email);
                topics.push(topic);
            });

            return topics;
        });
    },
    createTopic: function(topic) {
        return $.post("/forum/topics", {
            title: topic.title,
            email: topic.email
        });
    },
    getTopic: function(id) {
        return $.get("/forum/topic/" + encodeURIComponent(id)).
        then(function (item) {
            var topic = new Topic(item.id, item.title, item.creationDate, item.email);
            topics.push(topic);
        });
    }
};