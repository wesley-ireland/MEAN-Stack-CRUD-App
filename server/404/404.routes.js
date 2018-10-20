(() => {
    'use strict';

    var httpStatus = require('../shared-enums/http-status');

    const notFoundRoutes = function(app) {
        // Return 404 for any route that isn't already defined
        app.get('*', (req, res, next) => {
            res.status(httpStatus.NOT_FOUND).send('We\'re sorry, the page you are looking for doesn\'t exist.');
            next();
        });
    };
    module.exports = notFoundRoutes;
})();

