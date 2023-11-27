const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notificationOfUserId: {
        type: String,
        required: true
    },
    notificationOfPostId: {
        type: String,
        default: ''
    },
    notificationOfCommentId: {
        type: String,
        default: ''
    },
    notificationOfReplyId: {
        type: String,
        default: ''
    },
    notificationDetail: {
        type: String,
        required: true
    },
    read: {
        type: Array
    },
    notificationOfReceiverId: {
        type: Array
    },
    isBlock: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('notifications', notificationSchema);