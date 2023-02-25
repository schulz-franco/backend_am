const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    name: {
        type: String,
        min: 6,
        max: 255,
        default: ""
    },
    lastname: {
        type: String,
        min: 6,
        max: 255,
        default: ""
    },
    image: {
        type: String,
        min: 6,
        max: 255,
        default: ""
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
}, {
    timestamps: true,
})

const userModel = model('User', userSchema);

module.exports = userModel;