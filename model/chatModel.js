const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    members: {
        type: Array
    },
    isBlock: {
        type: Boolean,
        default: false
    }
} , {
    timestamps: true
});

module.exports = mongoose.model('chats' , chatSchema);