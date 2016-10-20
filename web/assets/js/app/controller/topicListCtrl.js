/**
 * @param {Object} $scope
 */
function topicListCtrl( $scope, storage ) {

    $scope.topic = {};

    function fetchAllTopics() {
        storage.getAllTopics().then(function (topics) {
            $scope.allTopics = topics;
        });
    }

    fetchAllTopics();



    $scope.send = function () {
        storage.createTopic($scope.topic).then(function () {
            fetchAllTopics();
        });
    };
}

app.controller( 'topicListCtrl', topicListCtrl );
