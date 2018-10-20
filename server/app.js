(() => {
    'use strict';

    // Get Express
    const express = require('express');
    // Get CORS https://github.com/expressjs/cors
    const cors = require('cors');
    // Get Moment https://momentjs.com/
    const moment = require('moment');
    // Get UUID https://www.npmjs.com/package/uuid
    const uuid = require('uuid/v4');
    // Define the port that express will listen to
    // Use the environment variable from the process that
    // is running the server or use 9000 as default
    const port = process.env.PORT || 9000;
    // Initialize the web server
    const app = express();
    // Enable CORS middleware
    app.use(cors());
    // Enable middleware to be able to read json from the request body
    app.use(express.json());
    // Global variable set each request to track request/response
    let requestUuid = '';
    // Disable caching by setting response headers 
    app.use((req, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next()
    });
    // Enable request logging middleware
    app.use((req, res, next) => {
        requestUuid = uuid();
        console.log(`Incoming request:  ${req.method} ${req.url} - ${requestUuid} - ${moment()}`)
        next();
    }); 
    // Define the RESTful API endpoint routes
    // Register the animal routes 
    require('./animal/animal.routes')(app);
    // Register the 404 catch-all (this must come last)
    // require('./404/404.routes')(app);
    // Enable response logging middleware
    app.use((req, res, next) => {
        console.log(`Request fulfilled: ${req.method} ${req.url} - ${requestUuid} - ${moment()}`);
        next();
    });
    // Start listening on the defined port for incoming requests
    app.listen(port, () => console.log(`FactChecker express server is listening on port ${port}...`));
})();