const fs = require('fs');
const { MongoDB } = require('mongodb');
const typeDefs2 = fs.readFileSync("typeDefs","utf-8");


async function saveOrUpdateTypeDef() {
    const client = new MongoDB(mongoURL, mongoOptions);
    try{
        const db = client.db(MongoDB);
        const collection = db.collection('models');

        const existingDocument = await collection.findOne({ name: "typeDefs.js" });

        if(existingDocument) {
            await collection.updateOne(
                { name: "typeDefs.js"},
                { $set: {content: typedefsContent }}
            );
            console.log("Updated typedefs.js in collection");
        } else {
            await collection.insertOne({ name: "typeDefs.js", content: typedefsContent });
            console.log("saved typedefs.js to the models collection.")
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        client.close();
    }
};

module.exports = {typeDefs2}
