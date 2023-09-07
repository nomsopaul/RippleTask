const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
        hello: String
        currentUser: User
    }
    type User {
        id: ID
        username: String
        email: String
        password: String
        token: String
    }
    # Mutation
    type Mutation {
        signup(username: String, email: String, password: String): User
        login(email: String, password: String): User
        updatetypeDefs(payload: String!): String
    }
`;

module.exports = { typeDefs };