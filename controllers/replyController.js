const replyModel = require("../model/replyModel");
const fs = require("fs/promises");
const path = require("path");
const notificationModel = require("../model/notificationModel");

const createReply = async (req, res) => {
    try {
        const { commentIdToReply, userIdToReply, replyMsg, tagUserId } = req.body;
        const replyData = new replyModel({
            commentIdToReply: commentIdToReply,
            userIdToReply: userIdToReply,
            replyMsg: replyMsg !== undefined ? replyMsg : "",
            replyImg: req?.file?.filename !== undefined ? req?.file?.filename : "",
            tagUserId: tagUserId !== undefined ? tagUserId : "",
        });
        const data = await replyData.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getReplyByCommentId = async (req, res) => {
    try {
        const { commentId } = req.body;
        const replyData = await replyModel.find({
            commentIdToReply: commentId
        });
        res.status(200).json(replyData);
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateReplyWithImage = async (req, res) => {
    try {
        const { replyId } = req.body;
        const replyData = await replyModel.findById({
            _id: replyId
        });
        if (replyData.replyImg !== "") {
            await fs.unlink(path.join(__dirname, `../public/replyImg/${replyData.replyImg}`));
        }
        await replyModel.findByIdAndUpdate(
            {
                _id: replyId,
            },
            {
                replyMsg: "",
                replyImg: req?.file?.filename,
            }
        );
        return res.status(200).json({ msg: "reply updated successfully" });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const updateReplyWithMsg = async (req, res) => {
    try {
        const { replyId, replyMsg, deleteImgInEditReply } = req.body;
        const replyData = await replyModel.findById({
            _id: replyId
        });
        if (deleteImgInEditReply) {
            await fs.unlink(path.join(__dirname, `../public/replyImg/${replyData.replyImg}`));
            await replyData.updateOne({
                replyImg: ""
            });
        }
        await replyModel.updateOne(
            {
                _id: replyId
            },
            {
                replyMsg: replyMsg
            },
        );
        res.status(200).json({ msg: "reply updated successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateReplyWithImageAndMsg = async (req, res) => {
    try {
        const { replyId, replyMsg } = req.body;
        const replyData = await replyModel.findById({
            _id: replyId
        });
        if (replyData.replyImg !== "") {
            await fs.unlink(path.join(__dirname, `../public/replyImg/${replyData.replyImg}`));
        }
        await replyData.updateOne({
            replyMsg: replyMsg,
            replyImg: req?.file?.filename,
        });
        res.status(200).json({ msg: "reply updated successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteReply = async (req, res) => {
    try {
        const { replyId } = req.body;
        const replyData = await replyModel.findById({
            _id: replyId
        });
        await notificationModel.deleteMany({
            notificationOfReplyId: replyData._id
        });
        if (replyData?.replyImg !== "") {
            await fs.unlink(path.join(__dirname, `../public/replyImg/${replyData.replyImg}`));
        }
        await replyData.deleteOne();
        res.status(200).json({ msg: "reply deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteReplyMsg = async (req, res) => {
    try {
        const { replyId } = req.body;
        await replyModel.findByIdAndUpdate(
            {
                _id: replyId,
            },
            {
                replyMsg: "",
            }
        );
        res.status(200).json({ msg: "delete reply msg successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
}

const likeAndDislikeReply = async (req, res) => {
    try {
        const { replyId, userIdToLike, postId, commentId, userIdToReply } = req.body;
        const replyData = await replyModel.findById({
            _id: replyId
        });
        if (!replyData.replyLikes.includes(userIdToLike)) {
            await replyData.updateOne({
                $push: {
                    replyLikes: userIdToLike
                }
            });
            if (userIdToReply !== userIdToLike) {
                const notificationData = new notificationModel({
                    notificationOfUserId: userIdToLike,
                    notificationOfPostId: postId,
                    notificationOfCommentId: commentId,
                    notificationOfReplyId: replyId,
                    notificationDetail: 'Like your reply',
                    notificationOfReceiverId: userIdToReply,
                });
                await notificationData.save();
            }
        } else {
            await replyData.updateOne({
                $pull: {
                    replyLikes: userIdToLike
                }
            });
            await notificationModel.deleteMany({
                notificationOfUserId: userIdToLike,
                notificationOfReplyId: replyId,
                notificationDetail: "Like your reply",
            });
        }
        res.status(200).json({ msg: "pending successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllReplys = async (req , res) => {
    try{
        const replys = await replyModel.find();
        res.status(200).json(replys);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    createReply,
    getReplyByCommentId,
    updateReplyWithImage,
    updateReplyWithMsg,
    updateReplyWithImageAndMsg,
    deleteReply,
    likeAndDislikeReply,
    deleteReplyMsg,
    getAllReplys
}