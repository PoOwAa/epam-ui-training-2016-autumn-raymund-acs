var AjaxStorage =  { };

AjaxStorage.getAllTopics = function(searchString) {
    return $.get("/forum/topics", {
        searchString: searchString
    }).then(function (data) {
        var topics = [];

        data.forEach(function (item) {
            var creationDate = new Date(item.creationDate);

            var topic = {
                title: item.title,
                email: item.email,
                creationDate: [ creationDate.getFullYear(), creationDate.getMonth(), creationDate.getDay() ].join('.'),
                creationTime: [ creationDate.getHours(), creationDate.getMinutes() ].join(':')
            };

            topics.push(topic);
        });

        return topics;
    });
};