(() => {
    // Get the mongoDb connector
    const connector = require('../db/mongo.connector');
    var ObjectId = require('mongodb').ObjectID;

    const animalsDao = {

        getAnimals: async () => {

            // Returns null if no results 
            return new Promise(async (resolve, reject) => {
                try {
                    const db = connector.getDb();
                    const collection = db.collection("Animals");
                    const animals = await collection.find({}).toArray();  
                    const results = animals.length === 0 ? null : animals;
                    resolve(results);
                }
                catch(err) {
                    reject(err);
                }
            }); 
        },

        getAnimal: async (id) => {

            // Returns null if no result
            return new Promise(async (resolve, reject) => {
                try {
                    const db = connector.getDb();
                    const collection = db.collection("Animals");
                    const animal = await collection.findOne({_id: new ObjectId(id)});  
                    resolve(animal);
                }
                catch(err) {
                    reject(err);
                }
            }); 
        },

        createAnimal: async (obj) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const db = connector.getDb();
                    const collection = db.collection("Animals");
                    var result = await collection.insertOne(obj);
                    const animal = result.ops[0];
                    console.log(`1 document inserted with id ${animal._id}`);
                    resolve(animal);
                }
                catch(err) {
                    reject(err);
                }
            }); 
        },

        deleteAnimal: async (id) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const db = connector.getDb();
                    await db.collection("Animals").deleteOne({_id: new ObjectId(id)});
                    console.log("1 document deleted");
                    resolve();
                }
                catch(err) {
                    reject(err);
                }
            }); 
        },

        updateAnimal: async (animalToUpdate) => {
            return new Promise(async (resolve, reject) => {

                try {
                    const db = connector.getDb();
                    animalToUpdate._id = new ObjectId(animalToUpdate._id);
                    var result = await db.collection("Animals").replaceOne({_id: new ObjectId(animalToUpdate._id)}, animalToUpdate);
                    console.log(`1 document updated with id ${animalToUpdate._id}`);
                    const updatedAnimal = result.ops[0];
                    resolve(updatedAnimal);
                }
                catch(err) {
                    reject(err);                    
                }
            }); 
        },

        getAnimalsCount: async (query = null, projection = null) => {
            // Will get all animals by defualt but you can pass in query
            // will filter results based on matched properties, and
            // projection will limit the fields that are returned.
            // (would be useful for omitting the mongo _id field)
            return new Promise(async (resolve, reject) => {
                try {
                    const db = connector.getDb();
                    const collection = db.collection('Animals');
                    const count = await collection.find(query, projection).count();  
                    resolve(count);
                }
                catch(err) {
                    reject(err);
                }
            });
        }

    };

    module.exports = animalsDao;

})();