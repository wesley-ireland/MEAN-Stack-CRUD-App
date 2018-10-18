// Define the app states
angular.module('factCheck').config(function($urlRouterProvider, $stateProvider) {

    $stateProvider
        .state('404', {
            name: '404',
            url: '/404',
            templateUrl: 'client/404/404.html'
        });

    // Redirect to 404 if page isnt found
    $urlRouterProvider.otherwise('/404');
});