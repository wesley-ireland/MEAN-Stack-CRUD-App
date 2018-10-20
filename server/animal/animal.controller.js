(() => {
    'use strict';

    // Get Lodash
    const _ = require ('lodash');
    // Get Joi for object validation
    const Joi = require('joi');
    // Get HTTP status code Enum
    const httpStatus = require('../shared-enums/http-status');
    // Get some animals seed data
    let animals = require('./seed.animals');
    // Get animal validation schemas
    const animalValidationSchemas = require('../shared-enums/validation-schemas').ANIMALS;

    // Define the animal HTTP request controller
    const animalController = {

        // Get a list of animals
        getAnimals: (req, res) => {
            let result = animals;
            const sortBy = req.query.sortBy;
            if (sortBy && animalValidationSchemas.SORTABLE_FIELDS.indexOf(req.query.sortBy) != -1) {
                result = _.sortBy(animals, [function(o) { return o[sortBy]; }]);
            }
            res.status(httpStatus.OK).send(result);
        },

        // Get a specific animal by id
        getAnimal: (req, res) => {
            // Find the animal with matching id
            const result = animals.find(a => a.id === parseInt(req.params.id));
            // If not return 404, otherwise return animal
            if (!result) return res.send(httpStatus.NOT_FOUND, `Animal with id ${req.params.id} was not found.`);
            return res.status(httpStatus.OK).send(result);
        },

        // Create an animal
        createAnimal: (req, res) => {
            // Validate the request body
            const result = Joi.validate(req.body, animalValidationSchemas.CREATE, { abortEarly: false });
            if (result.error)  
                return res.status(httpStatus.BAD_REQUEST).send(result.error.details[0].message);
            // Create new Animal, persist to local array
            const animal = {
                id: animals.length + 1,
                species: req.body.species,
                sound: req.body.sound
            }
            animals.push(animal);
            // Return the newly created animal
            return res.status(httpStatus.CREATED).send(animal);
        },

        // Delete an animal
        deleteAnimal: (req, res) => {
                // Find the animal
                const id = parseInt(req.params.id)
                const result = animals.find(a => a.id === id);
                // If not found, return 404
                if (!result) 
                    return res.send(httpStatus.NOT_FOUND, `Animal with id ${req.params.id} was not found`);
                // Otherwise remove & return 204 No Content
                _.remove(animals, (o) => o.id === id);
                return res.status(httpStatus.NO_CONTENT).send();
        },

        // Update an animal
        updateAnimal: (req, res) => {
            // Validate the request body 
            const result = Joi.validate(req.body, animalValidationSchemas.UPDATE, {abortEarly: false});
            if (result.error) {
                var errors = _.map(result.error.details, 'message').join("\r\n");
                return res.status(httpStatus.BAD_REQUEST).send(errors);
            }
            // Find the animal
            let animal = animals.find(a => a.id === parseInt(req.params.id));
            //If not found, return 404
            if (!animal) 
                return res.status(httpStatus.NOT_FOUND).send(`Animal with id ${req.params.id} was not found`);
            // Update the animal
            animal = req.body;
            // Return updated animal
            return res.status(httpStatus.CREATED).send(animal);
        }
    };

    // Export the controller as a module
    module.exports = animalController;
})();