(() => {

    const connector = require('../shared/mongo.connector');

    const animalsService = {
        getAnimals: async () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const client = await connector.connect();
                    const collection = client.db("Playground").collection("Animals");
                    const animals = await collection.find({}).toArray();  
                    client.close();
                    resolve(animals);
                }
                catch(err) {
                    reject(err);
                }
            }); 
        }
    }
    module.exports = animalsService;

})();