const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
    {
        postIdToReply: {
            type: String,
            required: true
        },
        commentIdToReply: {
            type: String,
            required: true,
        },
        userIdToReply: {
            type: String,
            required: true,
        },
        replyMsg: {
            type: String,
            default: "",
        },
        replyImg: {
            type: String,
            default: "",
        },
        tagUserId: {
            type: String,
            default: "",
        },
        replyLikes: {
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

module.exports = mongoose.model("replys", replySchema);