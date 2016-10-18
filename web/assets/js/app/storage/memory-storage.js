var MemoryStorage =  { };
var topics = [];

MemoryStorage.getAllTopics = function(searchString) {
    var deferred = $.Deferred();

    function topicsByPhrase() {
        var result = [];
        if (searchString) {
            searchString = searchString.toLocaleLowerCase();
            for (var i = 0; i < topics.length; i++) {
                if (topics[i].title.toLocaleLowerCase().indexOf(searchString) != -1) {
                    result.push(topics[i]);
                }
            }
        } else {
            result = topics;
        }
        deferred.resolve(result);
    }

    $.getJSON('/topics.json', function (topicsData) {
        topics = topicsData;
        topicsByPhrase();
    });

    return deferred.promise();
};