(() => {
    const moment = require('moment');
    const MongoClient = require('mongodb').MongoClient;
    const secrets = require('./secrets');
    const uri = `mongodb+srv://${secrets.MONGO_ADMIN_USER}:${secrets.MONGO_ADMIN_PASS}@playground-nbplt.mongodb.net/${secrets.DB_NAME}?retryWrites=true`;

    let db;
    
    const connector = {
        connect: async () => {
            return new Promise(async (resolve, reject) => {
                // Connect to MongoDB once and reuse the db to take advantage of 
                // connection pooling performance increases. Incoming requests will
                // use the getDb() function to get the singleton db object.
                // https://www.compose.com/articles/connection-pooling-with-mongodb/
                try {
                    console.log(`Connecting to database: "${secrets.DB_NAME}" - ${moment()}`);
                    // const client = await MongoClient.connect(uri, { useNewUrlParser: true });
                    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
                    db = client.db("Playground");
                    console.log(`Connection established: "${db.databaseName}" - ${moment()}`); 
                    resolve();
                }
                catch(err) {
                    console.log(`Connection failed. - ${moment()}`); 
                    reject(err);
                }
            });
        },
        getDb: () => {
            if (!db) throw('db is not defined');
            return db;
        }
    };
    module.exports = connector;
    
})();