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
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('comments' , commentSchema);