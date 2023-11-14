const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    members: {
        type: Array
    }
} , {
    timestamps: true
});

module.exports = mongoose.model('chats' , chatSchema);