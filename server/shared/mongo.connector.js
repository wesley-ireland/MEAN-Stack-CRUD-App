(() => {

    const MongoClient = require('mongodb').MongoClient;
    const secrets = require('./secrets');
    const uri = `mongodb+srv://${secrets.MONGO_ADMIN_USER}:${secrets.MONGO_ADMIN_PASS}@playground-nbplt.mongodb.net/Playground?retryWrites=true`;
    
    const mongoDbConnector = {
        connect: async () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const connection = await MongoClient.connect(uri, { useNewUrlParser: true })
                    return resolve(connection);
                }
                catch(err) {
                    reject(err);
                }
            }); 
        }
    }
    module.exports = mongoDbConnector;

})();