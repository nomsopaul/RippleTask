const fs = require('fs');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const { mongoose } = require('mongoose');
const typeDefsContent = fs.readFileSync("./typeDefs.js", 'utf-8')


dotenv.config()

    async function saveOrUpdateTypeDef() {
        const client = new MongoClient(process.env.MONGODB,);

        try {
            const db = (process.env.MONGODB);
            const collection = db.models;

            const existingDocument = await db.models.findOne({ name:"typeDefsjs" });

            if (existingDocument) {

                await collection.updateOne(
                    { name: "typeDefs.js" },
                    { $set: { content: typeDefsContent } }
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
    }

module.exports = {saveOrUpdateTypeDef};
