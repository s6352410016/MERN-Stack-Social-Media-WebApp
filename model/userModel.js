const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    follower:{
        type: Array
    },
    following:{
        type: Array
    },
    dateOfBirth:{
        type: String,
        default: ''
    },
    profilePicture:{
        type: String,
        default: ''
    },
    profileBackground: {
        type: String,
        default: ''
    },
    otherDetail:{
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBlock: {
        type: Boolean,
        defult: false
    }
} , {
    timestamps: true
});

module.exports = mongoose.model('users' , userSchema);