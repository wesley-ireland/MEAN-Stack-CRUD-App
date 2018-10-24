angular.module('factCheck').service('animalService', function($http) {

    this.getAnimals = async function() {
        try {
            let result = await $http.get('http://localhost:9000/api/animals');
            return result.data;
        }
        catch(err) {
            return err;
        }
    };

    this.getAnimal = async function(id) {
        try {
            let result = await $http.get(`http://localhost:9000/api/animals/${id}`);
            return result.data;
        }
        catch(err) {
            return err;
        }
    };

    this.createAnimal = async function(data) {
        try {
            let result = await $http.post('http://localhost:9000/api/animals', data);
            return result.data;
        }
        catch(err) {
            return err;
        }
    };

    this.deleteAnimal = async function(id) {
        try {
            let result = await $http.delete(`http://localhost:9000/api/animals/${id}`);
            return result.data;
        }
        catch(err) {
            return err;
        }
    };

    this.updateAnimal = async function(data) {
        try {
            let result = await $http.put(`http://localhost:9000/api/animals/${data._id}`, data);
            return result.data;
        }
        catch(err) {
            return err;
        }
    };
});