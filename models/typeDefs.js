const gql = require("graphql-tag");

const typeDefs = gql`

    type Query {
        hello: String
    }

    # User object
    type User {
        id: ID
        username: String
        email: String
        password: String
    }

    # Mutation
    type Mutation {
        signup(username: String, email: String, password: String): User
        login(email: String, password: String): User
    }
`;

module.exports = { typeDefs };