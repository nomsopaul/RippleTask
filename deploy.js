const fs = require('fs');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const typeDefsContent = fs.readFileSync("./typeDefs.js", 'utf-8')


dotenv.config()

    async function saveOrUpdateTypeDef() {
        const client = new MongoClient(process.env.MONGODB,);

        try {
            const db = client.db(process.env.MONGODB);
            const collection = db.collection('models');

            const existingDocument = await collection.findOne({ name: "typeDefs.js" });

            if (existingDocument) {

                await collection.updateOne(
                    { name: "typeDefs.js" },
                    { $set: { content: typeDefsContent } }
                );
                console.log("Updated typeDefs.js in collection");
            } else {
                await collection.insertOne({ name: "typeDefs.js", content: typeDefs2Content });
                console.log("saved typeDefs.js to the models collection.")
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            client.close();
        }
    }

module.exports = {saveOrUpdateTypeDef};
