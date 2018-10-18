// Get Lodash
const _ = require ('lodash');
// Get some animals seed data
let animals = require('./seed.animals');
// Get the animal related Enums
const animalEnums = require('./enum.animals');
// Get HTTP status code Enum
const HttpStatus = require('../shared-enums/HttpStatus');


// Define the animal HTTP request controller
const animalController = {

    // Get a list of animals
    getAnimals: (req, res) => {
        let result = animals;
        const sortBy = req.query.sortBy;
        if (sortBy && animalEnums.animalSortableFields.indexOf(req.query.sortBy) != -1) {
            result = _.sortBy(animals, [function(o) { return o[sortBy]; }]);
        }
        res.send(HttpStatus.OK, result);
    },

    // Get a specific animal by id
    getAnimal: (req, res) => {
        // Find the animal with matching id
        const result = animals.find(a => a.id === parseInt(req.params.id));
        // If not return 404, otherwise return animal
        if (!result) return res.send(HttpStatus.NotFound, `Animal with id ${req.params.id} was not found.`);
        res.send(HttpStatus.OK, result);
    },

    // Create an animal
    createAnimal: (req, res) => {
        // Validate the request body
        if (!req.body.species)  return res.send(HttpStatus.BadRequest, "The species field is required")
        if (!req.body.sound)    return res.send(HttpStatus.BadRequest, "The sound field is required")
        // Create new Animal, persist to local array
        const animal = {
            id: animals.length + 1,
            species: req.body.species,
            sound: req.body.sound
        }
        animals.push(animal);
        // Return the newly created animal
        res.send(HttpStatus.Created, animal);
    },

    // Delete an animal
    deleteAnimal: (req, res) => {
        // Find the animal
        const id = parseInt(req.params.id)
        const result = animals.find(a => a.id === id);
        // If not found, return 404
        if (!result) return res.send(HttpStatus.NotFound, `Animal with id ${req.params.id} was not found`);
        // Otherwise remove & return 204 No Content
        _.remove(animals, (o) => o.id === id);
        res.send(HttpStatus.NoContent);
    },

    // Update an animal
    updateAnimal: (req, res) => {
        // Validate the request body 
        if (!req.body.id)  return res.send(HttpStatus.BadRequest, "The id field is required")
        if (!req.body.species)  return res.send(HttpStatus.BadRequest, "The species field is required")
        if (!req.body.sound)    return res.send(HttpStatus.BadRequest, "The sound field is required")
        // Find the animal
        let animal = animals.find(a => a.id === parseInt(req.body.id));
        //If not found, return 404
        if (!animal) return res.send(HttpStatus.NotFound, `Animal with id ${req.body.id} was not found`);
        // Update the animal
        animal.species = req.body.species;
        animal.sound = req.body.sound;
        // Return updated animal
        res.send(HttpStatus.Created, animal);
    }
};

// Export the controller as a module
module.exports = animalController;