// Define the app states
angular.module('factCheck').config(function($stateProvider) {

    $stateProvider
        .state('home', {
            name: 'home',
            url: '/',
            templateUrl: 'client/home/home.html',
            controller: 'homeController'
        });
});