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
    // Get Animals Service
    const animalsService = require('./animals.service');
    // Define the animal HTTP request controller
    const animalController = {

        // Get a list of animals
        getAnimals: async (req, res, next) => {
            try {
                var result = await animalsService.getAnimals();
            }
            catch(err) {

            }
            const sortBy = req.query.sortBy;
            if (sortBy && animalValidationSchemas.SORTABLE_FIELDS.indexOf(req.query.sortBy) != -1) {
                result = _.sortBy(results, [function(o) { return o[sortBy]; }]);
            }
            res.status(httpStatus.OK).send(result);
            next();
        },

        // Get a specific animal by id
        getAnimal: (req, res, next) => {
            // Find the animal with matching id
            const result = animals.find(a => a.id === parseInt(req.params.id));
            // If not return 404, otherwise return animal
            if (!result) res.send(httpStatus.NOT_FOUND, `Animal with id ${req.params.id} was not found.`);
            res.status(httpStatus.OK).send(result);
            next();
        },

        // Create an animal
        createAnimal: (req, res, next) => {
            // Validate the request body
            const result = Joi.validate(req.body, animalValidationSchemas.CREATE, { abortEarly: false });
            if (result.error) {
                res.status(httpStatus.BAD_REQUEST).send(result.error.details[0].message);
                next();
            }
            // Create new Animal, persist to local array
            const animal = {
                id: animals.length + 1,
                species: req.body.species,
                sound: req.body.sound
            }
            animals.push(animal);
            // Return the newly created animal
            res.status(httpStatus.CREATED).send(animal);
            next();
        },

        // Delete an animal
        deleteAnimal: (req, res, next) => {
                // Find the animal
                const id = parseInt(req.params.id)
                const result = animals.find(a => a.id === id);
                // If not found, return 404
                if (!result) { 
                    res.send(httpStatus.NOT_FOUND, `Animal with id ${req.params.id} was not found`);
                    next();
                }
                // Otherwise remove & return 204 No Content
                _.remove(animals, (o) => o.id === id);
                res.status(httpStatus.NO_CONTENT).send();
                next();
        },

        // Update an animal
        updateAnimal: (req, res, next) => {
            // Validate the request body 
            const result = Joi.validate(req.body, animalValidationSchemas.UPDATE, {abortEarly: false});
            if (result.error) {
                var errors = _.map(result.error.details, 'message').join("\r\n");
                res.status(httpStatus.BAD_REQUEST).send(errors);
                next();
            }
            // Find the animal
            let animal = animals.find(a => a.id === parseInt(req.params.id));
            //If not found, return 404
            if (!animal) {
                res.status(httpStatus.NOT_FOUND).send(`Animal with id ${req.params.id} was not found`);
                next();
            }
            // Update the animal
            let updatedAnimal = req.body;
            animals = animals.map(a => a.id === updatedAnimal.id ? updatedAnimal : a);
            // Return updated animal
            res.status(httpStatus.OK).send(updatedAnimal);
            next();
        }
    };

    // Export the controller as a module
    module.exports = animalController;
})();