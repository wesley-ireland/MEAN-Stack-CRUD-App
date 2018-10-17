// Define the app states
angular.module('factCheck').config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('feed', {
            name: 'feed',
            url: '/feed',
            templateUrl: 'feed/feed.html',
            controller: 'feedController'
        });
        
    // In the future we can do something like this to provide more security to the pages:

    // resolve: {
    //     checkAuthAndPermissions: ['auth','$state','$stateParams', (auth,$state,$stateParams) => {
    //         try {
    //             // See if the user is authenticated
    //             await auth.isLoggedInPromise($state.href('feed', $stateParams))
    //         }
    //         catch(err) {
    //             // If not, redirect them to the login page
    //             return $state.go('login');
    //         }

    //         try {
    //             // Check if the user has permissions to view this page
    //             await auth.checkPermissions('feed')
    //         }
    //         catch(err) {
    //             // If not, redirect them to the home page
    //             return $state.go('home');
    //         }
    //     }]       
    // }

});