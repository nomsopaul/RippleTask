const { ApolloServer } = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const { resolvers } = require("./resolver.js");
const {typeDefs} = require("./models/typeDefs.js");
const {User} = require("./models/User.js");
const {Users} = require('./src/dataSources/users.js')

const server = new ApolloServer({
    typeDefs,
    resolvers
});


const MONGODB = "mongodb+srv://nomso:Brimaka12@cluster0.aj2kfzf.mongodb.net/"

mongoose
.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB Connection successful");
})
.catch(err => {
        console.log(err.message);
    });

const dataSources = () => ({
    users: new User(UserModel),
});



startStandaloneServer(server, {
    listen: {port: 4000 },
}).then(({url}) => {
    console.log(`Server ready at ${url}`);
});




    