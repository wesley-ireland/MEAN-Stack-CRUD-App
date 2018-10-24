// Define the app states
angular.module('factCheck').config(function($stateProvider) {

    $stateProvider
        .state('/', {
            name: '/',
            url: '/',
            templateUrl: '/animal/animals-list.html',
            controller: 'animalsListController'
        })
        .state('animals', {
            name: 'animals',
            url: '/animals',
            templateUrl: '/animal/animals-list.html',
            controller: 'animalsListController'
        })
    //    .state('animals', {
    //         name: 'animals',
    //         url: '/animals',
    //         templateUrl: '/animals/animals-list.html',
    //         controller: 'animalsListController'
    //     })
        .state('animals-create', {
            name: 'animals-create',
            url: '/animals/create',
            templateUrl: '/animal/animals-detail.html',
            controller: 'animalsDetailController'
        })
        .state('animals-edit', {
            name: 'animals-edit',
            url: '/animals/edit/:id',
            templateUrl: '/animal/animals-detail.html',
            controller: 'animalsDetailController'
        });
});