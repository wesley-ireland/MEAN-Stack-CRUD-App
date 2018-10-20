angular.module('factCheck').controller('animalsDetailController', function ($scope, $state, $stateParams, animalService) {
    
    const animalId = $stateParams.id;
    $scope.editMode = animalId ? true : false;

    $scope.init = async function() {
        $scope.input = {};
        if ($scope.editMode) {
            try {
                let result = await animalService.getAnimal(animalId); 
                $scope.animal = result;
                $scope.input = result;
                $scope.title = `Edit ${$scope.animal.species}`;
                $scope.$apply();
            }
            catch(err) {
                console.error(err);
            }
        }
        else {
            $scope.title = 'New Animal';
        }
    };

    $scope.disableSubmit = function() {
        let valid = $scope.input.species && $scope.input.sound;
        let disableInput = !valid;
        return disableInput;
    };

    $scope.createAnimalBtnClick = async function() {
        try {
            await animalService.createAnimal($scope.input);
            $state.go('animals-list');
        }
        catch(err) {
            console.error(err);
        }
    };
    
    $scope.updateAnimalBtnClick = async function() {
        try {
            await animalService.updateAnimal($scope.input);
            $state.go('/');
        }
        catch(err) {
            console.error(err);
        }
    };

    $scope.deleteAnimalBtnClick = async function(id) {
        try {
            await animalService.deleteAnimal(id);
            $state.go('/');
        }
        catch(err) {
            console.error(err);
        }
    }

    $scope.cancelBtnClick = function(id) {
        $state.go('/');
    }
});