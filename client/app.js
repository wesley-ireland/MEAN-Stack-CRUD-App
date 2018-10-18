// Define the angular module
angular.module('factCheck', ['ui.router'])
    .config(function ($locationProvider) {
        // https://stackoverflow.com/questions/22102815/how-to-delete-sign-in-angular-ui-router-urls
        $locationProvider.html5Mode(true);
    });