angular.module('factCheck').controller('feedController', function ($scope, $http) {

    $scope.init = function() {
        // Get a random list of users
        console.log('Getting a random list of users');
        $http.get('https://randomuser.me/api/?results=10')
            .then(result => result.data.results)
            .then(users => { 
                console.log(users); 
                $scope.users = users; })
            .catch(err =>  console.error('An error occurred getting the users', err));
    };

});