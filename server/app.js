(() => {
    'use strict';

    // Get Express
    const express = require('express');
    // Get CORS https://github.com/expressjs/cors
    const cors = require('cors');
    // Initialize the web server
    const app = express();
    // Enable CORS 
    app.use(cors());
    // Get HTTP Status codes
    const httpStatus = require('./shared-enums/http-status');
    // Define the port that express will listen to
    // Use the environment variable from the process that
    // is running the server or use 9000 as default
    const port = process.env.PORT || 9000;
    // Add middleware to be able to read json from the request body
    app.use(express.json());
    // Define the RESTful API endpoint routes
    // Register the animal routes 
    require('./animal/animal.routes')(app);
    // Return 404 for any route that isn't already defined above
    app.get('*', function(req, res){
        res.status(httpStatus.NOT_FOUND).send('We\'re sorry, the page you are looking for doesn\'t exist.');
    });
    // Start listening on the defined port for incoming requests
    app.listen(port, () => console.log(`FactChecker express server is listening on port ${port}...`));
    
})();