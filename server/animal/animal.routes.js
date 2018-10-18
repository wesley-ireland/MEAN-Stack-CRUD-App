// Get the animal HTTP request controller 
const animalController = require('./animal.controller');

const animalRoutes = function(app) {
    // Get a list of animals
    app.get('/api/animals', animalController.getAnimals);
    // Get a specific animal by id
    app.get('/api/animals/:id', animalController.getAnimal);
    // Create an animal
    app.post('/api/animals', animalController.createAnimal);
    // Delete an animal
    app.delete('/api/animals/:id', animalController.deleteAnimal);
    // Update an animal
    app.put('/api/animals', animalController.updateAnimal);
};
module.exports = animalRoutes;


