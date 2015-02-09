
app.factory( 'storage', function( $http ) {
    return new (AjaxStorageProvider( Utils, $http ))();
} );
