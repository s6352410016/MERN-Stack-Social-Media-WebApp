const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema(
    {
        postIdToShare: {
            type: String,
            required: true
        },
        userIdToShare: {
            type: String,
            required: true
        },
        shareMsg: {
            type: String,
            default: ''
        },
        sharePostLikes: {
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

module.exports = mongoose.model('shares' , shareSchema);