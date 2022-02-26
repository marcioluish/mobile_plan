const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;

const planSchema = new Schema({
    id: {
        type: String,
        default: uuid.v4,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    dataLimit: {
        type: Number,
        required: true,
    },
    callLimit: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model('plan', planSchema);
