const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        default: uuid.v4,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    planId: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('User', userSchema);
