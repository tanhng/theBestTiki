const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    name: String,
    password: String,
    moneyInCart:{
        type: Number,
        default:0,
    },
    orderList: Array,
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;