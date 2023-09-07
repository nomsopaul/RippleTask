const mongoose = require("mongoose");

const User = mongoose.model("User", {
    username: {type: String, default: null },
    email: {type: String, unique: true },
    password: {type: String },
    token: {type: String }
});

module.exports = { User };