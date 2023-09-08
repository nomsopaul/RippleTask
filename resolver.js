const { User } = require("./models/User.js");
const { ApolloError } = require('apollo-server-errors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require('fs');
let args;

const resolvers = {
    Query: {
        hello: () => "GraphQL is Awesome",
    },
    Mutation: {
        signup: async (_, args) => {
            const { username, email, password } = args;
            const oldUser = await User.findOne({ email });

            if (oldUser) {
                throw new ApolloError('A user is already registered with the email: ' + email, 'USER_ALREADY_EXISTS');
            }

            var encryptedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            });

            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFESTRING",
                {
                    expiresIn: "2h",
                }
            );

            newUser.token = token;

            const res = await newUser.save();

            return newUser;
        },
        async login(_, args) {
            const { email, password } = args;
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    "UNSAFESTRING",
                    {
                        expiresIn: "2h",
                    }
                );
                user.token = token;

                return user;
            } else {
                throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
            }
        },
            }
        }
module.exports = { resolvers };