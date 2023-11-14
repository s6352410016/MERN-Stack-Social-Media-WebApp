const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        userIdToPost: {
            type: String,
            required: true
        },
        postMsg: {
            type: String,
            default: ''
        },
        postImgs: {
            type: Array
        },
        postVideo: {
            type: String,
            default: ''
        },
        postLikes: {
            type: Array
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('posts' , postSchema);