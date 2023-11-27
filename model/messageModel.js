const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    chatMsg: {
        type: String,
        default: ''
    },
    chatImages: {
        type: Array
    },
    isBlock: {
        type: Boolean,
        default: false
    }
} , {
    timestamps: true
});

module.exports = mongoose.model('messages' , messageSchema);