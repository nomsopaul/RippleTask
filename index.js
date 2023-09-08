const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const { resolvers } = require("./resolver.js");
const { typeDefs } = require("./typeDefs.js");
const dotenv = require('dotenv');
const { saveOrUpdateTypeDef } = require("./deploy.js");

const server = new ApolloServer({
    typeDefs,
    resolvers
});

saveOrUpdateTypeDef();

dotenv.config()

mongoose
    .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connection successful");
    })
    .catch(err => {
        console.log(err.message);
    });

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
