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
                _id: Joi.string().min(24).max(24).required(),
                species: Joi.string().min(3).required(),
                sound: Joi.string().min(3).required()
            },
            SORTABLE_FIELDS: ['species', 'sound']
        }
    };

    module.exports = validationSchemas;
})();
