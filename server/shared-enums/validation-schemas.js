(() => {
    'use strict'

    // Get joi for schema validation
    var Joi = require('joi');

    const validationSchemas = {
        ANIMALS: {
            CREATE: {
                species: Joi.string().min(3).required(),
                sound: Joi.string().min(3).required()
            },
            UPDATE: {
                id: Joi.number().required(),
                species: Joi.string().min(3).required(),
                sound: Joi.string().min(3).required()
            },
            SORTABLE_FIELDS: ['species', 'sound']
        }
    };

    module.exports = validationSchemas;
})();
