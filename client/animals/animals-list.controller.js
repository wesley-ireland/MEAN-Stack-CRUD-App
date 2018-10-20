angular.module('factCheck').controller('animalsListController', function ($scope, $state, animalService) {

    $scope.init = function() {
        getAnimals();
    };

    $scope.createAnimalBtnClick = function() {
        $state.go('animals-create');
    };

    $scope.editAnimalBtnClick = function(id) {
        $state.go('animals-edit', { id: id });
    };

    $scope.deleteAnimalBtnClick = async function(id) {
        try {
            $scope.animals = await animalService.deleteAnimal(id);
            getAnimals();
        }
        catch(err) {
            console.error(err);
        }
    };

    async function getAnimals() {
        try {
            $scope.animals = await animalService.getAnimals();
            $scope.$apply();
        }
        catch(err) {
            console.error(err);
        }
    }
});