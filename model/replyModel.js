const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("replys", replySchema);