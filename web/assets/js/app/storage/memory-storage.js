var MemoryStorage =  { };
var topics = [];

MemoryStorage.getAllTopics = function(searchString) {
    var deferred = $.Deferred();

    function topicsByPhrase() {
        // TODO: Implement method
    }

    $.getJSON('/topics.json', function (topicsData) {
        topics = topicsData;
        topicsByPhrase();
    });

    return deferred.promise();
};