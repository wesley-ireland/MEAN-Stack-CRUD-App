(() => {
    'use strict';

    // Get Lodash
    const _ = require ('lodash');
    // Get Joi for object validation
    const Joi = require('joi');
    // Get HTTP status code Enum
    const httpStatus = require('../shared-enums/http-status');
    // Get animal validation schemas
    const animalValidationSchemas = require('../shared-enums/validation-schemas').ANIMALS;
    // Get Animals Data Access Object
    const animalsDao = require('./animals.dao');
    // Define the animal HTTP request controller
    const animalController = {

        // Get a list of animals
        getAnimals: async (req, res, next) => {
            try {
                var animals = await animalsDao.getAnimals(); 
                if (!animals) {
                    res.status(httpStatus.NO_CONTENT).send();
                    next();
                    return;
                }
                // Sort the results if sortBy query param was provided
                if (req.query.sortBy && animalValidationSchemas.SORTABLE_FIELDS.indexOf(req.query.sortBy) != -1) {
                    animals = _.sortBy(animals, [function(o) { return o[req.query.sortBy]; }]);
                }
                // Send the results and call the next peice of middleware
                res.status(httpStatus.OK).send(animals);
                next();
            }
            catch(err) {
                console.error(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            }
        },

        // Get a specific animal by id
        getAnimal: async (req, res, next) => {
            try {
                var animal = await animalsDao.getAnimal(req.params.id);
                // Return 404 if animal not found
                if (!animal) {
                    res.send(httpStatus.NOT_FOUND, `Animal with id ${req.params.id} was not found.`);
                    return;
                }
                // Send the results and call the next peice of middleware
                res.status(httpStatus.OK).send(animal);
                next();
            }
            catch(err) {
                console.error(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            }
        },

        // Create an animal
        createAnimal: async (req, res, next) => {
            try {
                // Validate the request body
                const validationResult = Joi.validate(req.body, animalValidationSchemas.CREATE, { abortEarly: false });
                if (validationResult.error) {
                    res.status(httpStatus.BAD_REQUEST).send(validationResult.error.details[0].message);
                    next();
                    return;
                }
                // Persist the new animal and return 201 Created
                const newAnimal = await animalsDao.createAnimal(req.body);
                res.status(httpStatus.CREATED).send(newAnimal);
                next();
            }
            catch(err) {
                console.error(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            }
            
        },

        // Delete an animal
        deleteAnimal: async (req, res, next) => {
            try {
                // Find the animal
                const animal = await animalsDao.getAnimal(req.params.id);
                // If not found, return 404
                if (!animal) { 
                    res.send(httpStatus.NOT_FOUND, `Animal with id ${req.params.id} was not found`);
                    next();
                    return;
                }
                // Otherwise remove & return 204 No Content
                await animalsDao.deleteAnimal(req.params.id);
                res.status(httpStatus.NO_CONTENT).send();
                next();
            }
            catch(err) {
                console.error(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            }
        },

        // Update an animal
        updateAnimal: async (req, res, next) => {
            try {
                // Validate the request body, return 400 if invalid body OR if 
                // the id parameter doesn't match the id in the request body
                const validationResult = Joi.validate(req.body, animalValidationSchemas.UPDATE, {abortEarly: false});
                if (validationResult.error) {
                    var errors = _.map(validationResult.error.details, 'message').join("\r\n");
                    res.status(httpStatus.BAD_REQUEST).send(errors);
                    next();
                    return;
                }
                if (req.body._id !== req.params.id) {
                    res.status(httpStatus.BAD_REQUEST).send("Request id parameter does not match the _id field in the request body");
                    next();
                    return;
                }
                // Find the animal, if not found return 404
                const animal = await animalsDao.getAnimal(req.params.id);
                if (!animal) {
                    res.status(httpStatus.NOT_FOUND).send(`Animal with id ${req.params.id} was not found`);
                    next();
                    return;
                }
                // Update the animal, return updated record
                const updatedAnimal = await animalsDao.updateAnimal(req.body);
                res.status(httpStatus.OK).send(updatedAnimal);
                next();
            }
            catch(err) {
                console.error(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            }
        }
    };

    // Export the controller as a module
    module.exports = animalController;
})();