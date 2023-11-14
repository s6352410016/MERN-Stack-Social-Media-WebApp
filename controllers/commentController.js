const commentModel = require('../model/commentModel');
const notificationModel = require('../model/notificationModel');
const replyModel = require("../model/replyModel");
const fs = require('fs');
const path = require('path');

const createComment = async (req, res) => {
    try {
        const { postIdToComment, userIdToComment, commentMsgs } = req.body;
        const saveComment = await new commentModel(
            {
                postIdToComment: postIdToComment,
                userIdToComment: userIdToComment,
                commentMsgs: commentMsgs,
                commentImg: req.file !== undefined ? req.file.filename : ''
            }
        );
        const commentData = await saveComment.save();
        return res.status(201).json({ msg: 'comment created', commentId: commentData._id });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const updateCommentWithImage = async (req, res) => {
    try {
        const { commentId, commentMsgs } = req.body;
        const commentData = await commentModel.findById(
            {
                _id: commentId
            }
        );
        fs.unlink(path.join(__dirname, `../public/commentImg/${commentData.commentImg}`), (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
        await commentData.updateOne(
            {
                commentImg: req.file !== undefined ? req.file.filename : '',
                commentMsgs: commentMsgs
            }
        );
        return res.status(200).json({ msg: 'comment updated.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const updateCommentWithMsgs = async (req, res) => {
    try {
        const { commentId, commentMsgs, deleteImgInEditComment } = req.body;
        const commentData = await commentModel.findById({
            _id: commentId,
        });
        if (deleteImgInEditComment) {
            fs.unlink(path.join(__dirname, `../public/commentImg/${commentData.commentImg}`), (err) => {
                if (err) {
                    return false;
                }
                return true;
            });
            await commentData.updateOne({
                commentImg: "",
            });
        }
        await commentModel.findByIdAndUpdate(
            {
                _id: commentId
            },
            {
                commentMsgs: commentMsgs
            }
        );
        return res.status(200).json({ msg: 'comment updated.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const replyData = await replyModel.find({
            commentIdToReply: commentId
        });
        replyData.map(async (reply) => {
            if (reply.replyImg !== "") {
                fs.unlink(path.join(__dirname, `../public/replyImg/${reply.replyImg}`), (err) => {
                    if (err) {
                        return false;
                    }
                    return true;
                });
            }
            await notificationModel.deleteOne({
                notificationOfReplyId: reply._id
            });
        });
        await replyModel.deleteMany({
            commentIdToReply: commentId
        });
        await notificationModel.deleteMany({
            notificationOfCommentId: commentId
        });
        const commentData = await commentModel.findById(
            {
                _id: commentId
            }
        );
        fs.unlink(path.join(__dirname, `../public/commentImg/${commentData.commentImg}`), (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
        await commentData.deleteOne();
        return res.status(200).json({ msg: 'comment deleted.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deleteCommentMsg = async (req, res) => {
    try {
        const { commentId } = req.body;
        await commentModel.findByIdAndUpdate(
            {
                _id: commentId,
            },
            {
                commentMsgs: "",
            }
        );
        return res.status(200).json({ msg: 'delete comment msg sucessfully.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getAllComments = async (req, res) => {
    try {
        const comments = await commentModel.find();
        if (!res.headersSent) {
            return res.status(200).json(comments);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getCommentByPostId = async (req, res) => {
    try {
        const { postId } = req.body;
        const comments = await commentModel.find({
            postIdToComment: postId,
        });
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json(err);
    }
}

const likeAndDislikeComment = async (req, res) => {
    try {
        const { commentId, userIdToLike, postId, userIdToComment } = req.body;
        const commentData = await commentModel.findById({
            _id: commentId
        });
        if (!commentData.commentLikes.includes(userIdToLike)) {
            await commentData.updateOne({
                $push: {
                    commentLikes: userIdToLike
                }
            });
            if (userIdToLike !== userIdToComment) {
                const notificationData = new notificationModel({
                    notificationOfUserId: userIdToLike,
                    notificationOfPostId: postId,
                    notificationOfCommentId: commentId,
                    notificationDetail: 'Like your comment',
                    notificationOfReceiverId: userIdToComment
                });
                await notificationData.save();
            }
        } else {
            await commentData.updateOne({
                $pull: {
                    commentLikes: userIdToLike
                }
            });
            await notificationModel.findOneAndDelete({
                notificationOfUserId: userIdToLike,
                notificationOfCommentId: commentId,
                notificationDetail: "Like your comment",
            });
        }
        res.status(200).json({ msg: "pending successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createComment,
    updateCommentWithImage,
    updateCommentWithMsgs,
    deleteComment,
    getAllComments,
    likeAndDislikeComment,
    deleteCommentMsg,
    getCommentByPostId,
}