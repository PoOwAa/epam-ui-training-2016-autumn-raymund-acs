/*jslint node: true, plusplus: true, white: true*/

"use strict";

var startTime = new Date().getTime();

var express = require('express'),
    path = require('path'),
    storage = require('node-persist'),
    bodyParser = require('body-parser'),
    xss = require('xss'),
    APP_PORT = 3000;

var Sanitizer = (function () {
    return {
        sanitizeString: function (s) {
            if (typeof s !== 'string') {
                return '';
            }
            return xss(s);
        }
    };
}());

var Topic = function (title, email, creationDate, messages) {
    function sanitizeItem(item) {
        return {
            id: item.id,
            email: Sanitizer.sanitizeString(item.email),
            text: Sanitizer.sanitizeString(item.text),
            creationDate: item.creationDate
        };
    }

    function sanitizeItems(items) {
        var result = [],
            i;
        if (items instanceof Array) {
            for (i = 0; i < items.length; i++) {
                result.push(sanitizeItem(items[i]));
            }
        }
        return result;
    }

    this.title = Sanitizer.sanitizeString(title);
    this.email = Sanitizer.sanitizeString(email);
    var now = new Date();
    this.creationDate = creationDate || now;
    this.messages = sanitizeItems(messages) || [];
};


var Message = function (email, text, creationDate) {
    this.email = Sanitizer.sanitizeString(email);
    this.text = Sanitizer.sanitizeString(text);
    var now = new Date();
    this.creationDate = creationDate || now;
};

var db = (function () {
    var FORUM_KEY = 'forum';

    function getItemIndexById(id, arr) {
        var i,
            isFound = false;
        for (i = 0; i < arr.length && !isFound; i++) {
            if (arr[i].id === parseInt(id)) {
                isFound = true;
            }
        }
        if (isFound) {
            return i - 1;
        } else {
            return -1;
        }
    }

    function createEmptyForum() {
        return {topics: []};
    }

    return {
        init: function () {
            storage.initSync({
                //logging: true,
                dir: 'db/'
            });
            console.log('Database initialized');
        },
        createTopic: function (topic) {
            var i,
                err,
                forum,
                nextTopicId = 1;
            try {
                if (topic instanceof Topic) {
                    forum = storage.getItem(FORUM_KEY);

                    if (!forum) {
                        forum = createEmptyForum();
                    }

                    if (forum.topics.length) {
                        nextTopicId = forum.topics[forum.topics.length - 1].id + 1;
                    }
                    topic.id = nextTopicId;

                    forum.topics.push(topic);
                    storage.setItem(FORUM_KEY, forum);

                    return topic;
                } else {
                    err = "The parameter is not an instance of Topic!";
                    console.error(err);
                    throw new Error(err);
                }
            } catch (e) {
                console.error(e);
                throw new Error('Error while creating the topic!');
            }
        },
        createMessage: function (topicId, message) {
            var err,
                forum,
                topicIndex,
                nextMessageId = 1;
            try {
                if (message instanceof Message) {
                    forum = storage.getItem(FORUM_KEY);

                    if (!forum) {
                        err = "The forum object does not exist!";
                        console.error(err);
                        throw new Error(err);
                    }

                    topicIndex = getItemIndexById(topicId, forum.topics);

                    if (topicIndex === -1) {
                        err = "The topic with id=" + topicId + " does not exist!";
                        console.error(err);
                        throw new Error(err);
                    }

                    var numberOfMessages = forum.topics[topicIndex].messages.length;
                    if (numberOfMessages > 0) {
                        nextMessageId = forum.topics[topicIndex].messages[numberOfMessages - 1].id + 1;
                    }
                    message.id = nextMessageId;

                    forum.topics[topicIndex].messages.push(message);

                    storage.setItem(FORUM_KEY, forum);

                    return message;
                } else {
                    err = "The parameter is not an instance of Message!";
                    console.error(err);
                    throw new Error(err);
                }
            } catch (e) {
                console.error(e);
                throw new Error('Error while creating the message!');
            }
        },
        getTopics: function (fromId, searchString) {
            var forum = storage.getItem(FORUM_KEY) || createEmptyForum();
            var result = forum.topics;

            if (fromId !== undefined) {
                result = result.filter(function (topic) {
                    return topic.id > fromId;
                });
            }

            if (searchString !== undefined && searchString.trim().length > 0) {
                result = result.filter(function (topic) {
                    return topic.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
                });
            }

            return result;
        },
        getTopicsByTitle: function (searchString) {
            var forum = storage.getItem(FORUM_KEY) || createEmptyForum();
            var topicCount = forum.topics.length;
            var result = [];
            for (var i = 0; i < topicCount; i++) {
                if (forum.topics[i].title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
                    result.push(forum.topics[i]);
                }
            }
            return result;
        },
        getTopicById: function (topicId) {
            var forum = storage.getItem(FORUM_KEY) || createEmptyForum();
            var topicIndex = getItemIndexById(topicId, forum.topics);
            var result = JSON.parse(JSON.stringify(forum.topics[topicIndex])); // Create a copy.
            delete result.messages;
            return result;
        },

        getMessagesByTopicId: function (topicId, messageFromId, searchString) {
            var forum = storage.getItem(FORUM_KEY) || createEmptyForum();
            var topicIndex = getItemIndexById(topicId, forum.topics);
            var result = forum.topics[topicIndex].messages; // Create a copy.

            if (messageFromId !== undefined) {
                result = result.filter(function (message) {
                    return message.id > messageFromId;
                });
            }

            if (searchString !== undefined && searchString.trim().length > 0) {
                result = result.filter(function (message) {
                    return message.text.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
                });
            }
            console.log(result);
            return result;
        },


        getMessagesByTopicIdAndText: function (topicId, searchString) {
            var forum = storage.getItem(FORUM_KEY) || createEmptyForum();
            var topicIndex = getItemIndexById(topicId, forum.topics);
            var messages = forum.topics[topicIndex].messages;
            var messagesCount = messages.length;
            var result = [];
            for (var i = 0; i < messagesCount; i++) {
                if (messages[i].text.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
                    result.push(messages[i]);
                }
            }
            return result;
        },

        clear: function () {
            try {
                storage.clearSync();
                console.log('Database cleared');
            } catch (e) {
                console.error(e);
                throw new Error('Error in clearing the database!');
            }
        }
    }

}());

db.init();
if (process.argv[2] === 'init') {
    db.clear();

    db.createTopic(new Topic("Training questions", "test@email.com", new Date(2016, 2, 20, 15, 23, 10), [
        {
            email: "kiss.janos@gmail.com",
            text: "Hi, I don't understand something.",
            creationDate: new Date(2016, 2, 21, 12, 32, 12)
        },
        {
            email: "admin@training.com",
            text: "What do you not understand?",
            creationDate: new Date(2016, 2, 22, 10, 5, 5)
        }
    ]));
    db.createTopic(new Topic("Suggestions", "test@email.com", null, [
        {
            email: "helpful.guy@gmail.com",
            text: "I think the training should be longer.",
            creationDate: new Date()
        }
    ]));
    db.createTopic(new Topic("Other discussion", "test@email.com", new Date(2015, 1, 20, 5, 23, 10)));

    db.createMessage(3, new Message("kiss.arpad@gmail.com", "Hi everyone, how are you?", new Date()));
    db.createMessage(3, new Message("admin@training.com", "Thanks, I'm okay.", new Date()));
    db.createMessage(3, new Message("kiss.arpad@gmail.com", "That's cool.", new Date()));

}

var messenger = (function () {
    function send(res, data, statusCode) {
        res.status(statusCode).send(data);
    }

    return {
        sendMessage: function (res, data) {
            send(res, data, 200);
        },
        sendError: function (res, data, statusCode) {
            send(res, data, statusCode || 500);
        }
    };
}());

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'web')));

app.get('/forum/topics', function (req, res) {
    try {
        var result = db.getTopics(req.query.fromId, req.query.searchString),
            errorMessage;
        if (!result) {
            errorMessage = 'No topic could be found in the database.';
            console.error(errorMessage);
            messenger.sendError(res, errorMessage, 404);
        } else {
            messenger.sendMessage(res, result);
        }
    } catch (e) {
        console.error(e.message);
        messenger.sendError(res, 'Couldn\'t get the topic list. Please check back later.');
    }
});

app.get('/forum/topics/search', function (req, res) {
    try {
        var result = db.getTopicsByTitle(req.query.searchString),
            errorMessage;
        if (!result) {
            errorMessage = 'No topic could be found in the database.';
            console.error(errorMessage);
            messenger.sendError(res, errorMessage, 404);
        } else {
            messenger.sendMessage(res, result);
        }
    } catch (e) {
        console.error(e.message);
        messenger.sendError(res, 'Couldn\'t get the topic list. Please check back later.');
    }
});

app.get('/forum/topic/:topicId', function (req, res) {
    try {
        var result = db.getTopicById(req.params.topicId),
            errorMessage;
        if (!result) {
            errorMessage = 'No topic could be found in the database.';
            console.error(errorMessage);
            messenger.sendError(res, errorMessage, 404);
        } else {
            messenger.sendMessage(res, result);
        }
    } catch (e) {
        console.error(e.message);
        messenger.sendError(res, 'Couldn\'t get the topic. Please check back later.');
    }
});

app.get('/forum/topic/:topicId/messages', function (req, res) {
    try {
        var result = db.getMessagesByTopicId(req.params.topicId, req.query.fromId, req.query.searchString),
            errorMessage;
        if (!result) {
            errorMessage = 'No topic could be found in the database.';
            console.error(errorMessage);
            messenger.sendError(res, errorMessage, 404);
        } else {
            messenger.sendMessage(res, result);
        }
    } catch (e) {
        console.error(e.message);
        messenger.sendError(res, 'Couldn\'t get the messages for the topic. Please check back later.');
    }
});

app.post('/forum/topics', function (req, res) {
    try {
        var result = db.createTopic(new Topic(req.body.title, req.body.email));
        messenger.sendMessage(res, result);
    } catch (e) {
        console.error(e.message);
        messenger.sendError(res, 'Couldn\'t create topic. Please check back later.');
    }
});

app.get('/forum/topic/:topicId/message/search', function (req, res) {
    try {
        var result = db.getMessagesByTopicIdAndText(req.params.topicId, req.query.searchString),
            errorMessage;
        if (!result) {
            errorMessage = 'No messages could be found in the database.';
            messenger.sendError(res, errorMessage, 404);
        } else {
            messenger.sendMessage(res, result);
        }
    } catch (e) {
        console.error(e.message);
        messenger.sendError(res, 'Couldn\'t get the messages. Please check back later.');
    }
});

app.post('/forum/topic/:topicId/messages', function (req, res) {
    try {
        var result = db.createMessage(req.params.topicId, new Message(req.body.email, req.body.text));
        messenger.sendMessage(res, result.id.toString());
    } catch (e) {
        console.error(e.message);
        messenger.sendError(res, 'Couldn\'t create message. Please check back later.');
    }
});

app.listen(APP_PORT);

console.log('Server startup in ' + (new Date().getTime() - startTime) + 'ms');
console.log('Server running on http://localhost:' + APP_PORT);
