const fs = require('fs');
const { MongoDB } = require('mongodb');
const typeDefs = require("./typeDefs.js");
const dotenv = require('dotenv');


async function saveOrUpdateTypeDef() {
    const client = new MongoDB(, mongoOptions);
    try{
        const db = client.db(MONGODB);
        const collection = db.collection('models');

        const existingDocument = await collection.findOne({ name: "typeDefs.js" });

        if(existingDocument) {
            await collection.updateOne(
                { name: "typeDefs.js"},
                { $set: {content: typeDefsContent }}
            );
            console.log("Updated typeDefs.js in collection");
        } else {
            await collection.insertOne({ name: "typeDefs.js", content: typeDefsContent });
            console.log("saved typeDefs.js to the models collection.")
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        client.close();
    }
};

module.exports = {typeDefs}
