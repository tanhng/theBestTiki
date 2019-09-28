const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    name: String,
    password: String
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;