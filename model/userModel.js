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
        type: String
    },
    profilePicture:{
        type: String
    },
    otherDetail:{
        type: String
    }
} , {
    timestamps: true
});

module.exports = mongoose.model('users' , userSchema);