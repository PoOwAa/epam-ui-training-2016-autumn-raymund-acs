/**
 * Class for AJAX based storage implementation
 */
var AjaxStorage = {
      getAllTopics : function(searchString) {
          return $.get("/forum/topics", {
              searchString: searchString
          }).then(function (data) {
              var topics = [];

              data.forEach(function (item) {
                  var creationDate = new Date(item.creationDate);

                  var topic = {
                      id: item.id,
                      title: item.title,
                      email: item.email,
                      creationDate: [ creationDate.getFullYear(), creationDate.getMonth(), creationDate.getDay() ].join('.'),
                      creationTime: [ creationDate.getHours(), creationDate.getMinutes() ].join(':')
                  };

                  topics.push(topic);
              });

              return topics;
          });
      },
      createTopic : function (topic) {
          return $.post("/forum/topics", {
              title: topic.title,
              email: topic.email
          });
      },
      getTopic : function (id) {
          return $.get("/forum/topic/" + encodeURIComponent(id)).then(function (item) {

                  var creationDate = new Date(item.creationDate);

                  var topic = {
                      id: item.id,
                      title: item.title,
                      email: item.email,
                      creationDate: [ creationDate.getFullYear(), creationDate.getMonth(), creationDate.getDay() ].join('.'),
                      creationTime: [ creationDate.getHours(), creationDate.getMinutes() ].join(':')
                  };

              return topic;
          });
      },
      getAllMessages : function (searchString, topicId) {
          return $.get("/forum/topic/" + encodeURIComponent(topicId) + "/messages", {
              searchString: searchString
          }).then(function (data) {
              var messages = [];
              data.forEach(function (item) {
                  var creationDate = new Date(item.creationDate);

                  var message = {
                      id: item.id,
                      text: item.text,
                      email: item.email,
                      creationDate: [ creationDate.getFullYear(), creationDate.getMonth(), creationDate.getDay() ].join('.'),
                      creationTime: [ creationDate.getHours(), creationDate.getMinutes() ].join(':')
                  };

                  messages.push(message);
              });
              return messages;
          });
      },
      createMessage : function (message, topicId) {
          return $.post("/forum/topic/" + encodeURIComponent(topicId) + "/messages", {
              text: message.text,
              email: message.email
          });
      }
};