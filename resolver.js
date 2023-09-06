const { User } = require("./models/User.js");
const bcrypt = require('bcryptjs');

const resolvers = {
    Query: {
        hello: () => "GraphQL is Awesome",
    },
    Mutation: {
        signup: async (parent, args) => {
            const { username, email, password } = args;
            const newUser = new User({
                username,
                email,
                password,
            });
            await newUser.save();
            return newUser;
        },

        login: async (parent, args) => {
            try {
                const { email, password } = args;
                const user = await User.findOne({ email });

                if (!user) {
                    throw new Error('User not found.');
                }

                // const isPasswordValid = await compare(password, user.password);

                if (password!=user.password) {
                    throw new Error('Invalid password.');
                }
                return user;
            } catch (error) {
                throw new Error(`Error logging in: ${error.message}`);
            }
        },
 },
};
module.exports = { resolvers };