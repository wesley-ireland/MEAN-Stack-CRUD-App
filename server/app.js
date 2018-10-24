(async () => {
    'use strict';

    // Get Express
    const express = require('express');
    // Get CORS https://github.com/expressjs/cors
    const cors = require('cors');
    // Get Moment https://momentjs.com/
    const moment = require('moment');
    // Get UUID https://www.npmjs.com/package/uuid
    const uuid = require('uuid/v4');
    // Get MongoDb Connector
    const mongoConnector = require('./db/mongo.connector');
    // Get path
    const path = require('path');
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
    // Set the static files location
    app.use(express.static(path.resolve('client')));
    app.use('/node_modules', express.static(path.resolve('node_modules')));
    // Global variable set each request to track request/response
    let requestUuid = '';
    // Disable caching by setting response headers 
    app.use((req, res, next) => { 
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    });
    // Log incoming requests
    app.use((req, res, next) => {
        requestUuid = uuid();
        console.log(`Incoming request:  ${req.method} ${req.url} - ${moment()} - Request Id: ${requestUuid}`);
        next();
    });
    // Start the connection to MongoDb
    try {
        await mongoConnector.connect(app);
    }
    catch(err) {
        console.log(err);
    }
    // Define the RESTful API endpoint routes
    // Register the animal routes 
    require('./animal/animal.routes')(app);
    // Rewrite virtual urls to angular app to enable refreshing of internal pages
    app.get('*', function(req, res, next) {
        if (!res._headerSent) {
            res.sendFile(path.resolve('client/index.html'));    
        }
        next();
    });
    // Log completed requests
    app.use((req, res, next) => {
        console.log(`Request fulfilled: ${req.method} ${req.url} - ${moment()} - Request Id: ${requestUuid}`);
    });
    // Start listening on the defined port for incoming requests
    app.listen(port, () => console.log(`FactChecker express server is listening on port ${port}...`));
})();