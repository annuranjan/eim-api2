const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    empId: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    username: String,
    password: String,
    usertype: String
});

module.exports = mongoose.model('User', UserSchema, 'users');