// Define the app states
angular.module('factCheck').config(function($stateProvider) {

    $stateProvider
        .state('/', {
            name: '/',
            url: '/',
            templateUrl: 'client/animals/animals-list.html',
            controller: 'animalsListController'
        })
        .state('animals-list', {
            name: 'animals',
            url: '/animals',
            templateUrl: 'client/animals/animals-list.html',
            controller: 'animalsListController'
        })
        .state('animals-create', {
            name: 'animals-create',
            url: '/animals/create',
            templateUrl: 'client/animals/animals-detail.html',
            controller: 'animalsDetailController'
        })
        .state('animals-edit', {
            name: 'animals-edit',
            url: '/animals/edit/:id',
            templateUrl: 'client/animals/animals-detail.html',
            controller: 'animalsDetailController'
        });
});