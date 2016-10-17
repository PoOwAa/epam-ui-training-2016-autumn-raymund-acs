var MemoryStorage =  { };
var topics = [];

MemoryStorage.getAllTopics = function(searchString) {
    console.log('Memory Storage start');
    var deferred = $.Deferred();
    var filteredTopics = {};

    function topicsByPhrase() {
        // TODO: Implement method
        //console.log(topics);
        $.each(topics, function() {
            console.log(this.title);
            console.log(searchString);
            console.log(this.title.indexOf(searchString));
            if (this.title.indexOf(searchString) != -1) {
                console.log("Added");
                filteredTopics.push(this);
            }
        });
        //console.log(filteredTopics);

        if (filteredTopics.length == 0) {
            return topics;
        } else {
            return filteredTopics;
        }

    }

    $.getJSON('/topics.json', function (topicsData) {
        topics = topicsData;
        topicsByPhrase();
    });

    return deferred.promise();
};