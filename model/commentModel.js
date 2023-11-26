const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        postIdToComment: {
            type: String,
            required: true
        },
        userIdToComment: {
            type: String,
            required: true
        },
        commentMsgs: {
            type: String,
            default: ''
        },
        commentImg: {
            type: String,
            default: ''
        },
        commentLikes: {
            type: Array
        },
        isBlock: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('comments', commentSchema);