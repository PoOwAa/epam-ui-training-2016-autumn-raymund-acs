var app = angular.module( 'app', ['ngRoute'] );

app.config( function( $routeProvider, $httpProvider, $injector ) {
    $routeProvider
        .when('/', {
            templateUrl: 'assets/templates/topicList.html',
            controller: 'topicListCtrl'
        } )
        .when('/topic/:id', {
            templateUrl: 'assets/templates/topic.html',
            controller: 'topicCtrl'
        } )
        .otherwise( { redirectTo: '/' } );

    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $httpProvider.interceptors.unshift( function( $httpParamSerializer ) {
        return {
            request: function( config ) {
                if( typeof config.data === "string" ) return config;
                config.data = $httpParamSerializer( config.data );
                return config;
            },
            response: function( x ) { return x; }
        };
    } );
} );
