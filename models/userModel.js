const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "User must have a valid username"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "User must have a valid password"]
    }
});

const User = mongoose.model("User",userSchema);

// exporting our User
module.exports = User;