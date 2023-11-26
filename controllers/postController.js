const postModel = require('../model/postModel');
const commentModel = require('../model/commentModel');
const notificationModel = require('../model/notificationModel');
const fs = require('fs');
const path = require('path');
const replyModel = require('../model/replyModel');
const sharePostModel = require("../model/shareModel");

const createPostWithMsg = async (req, res) => {
    try {
        const { userIdToPost, postMsg } = req.body;
        const savePost = await new postModel({
            userIdToPost: userIdToPost,
            postMsg: postMsg
        });
        const postData = await savePost.save();
        return res.status(201).json({ msg: 'post created.', postId: postData._id });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const createPostWithImages = async (req, res) => {
    try {
        const { userIdToPost, postMsg } = req.body;
        const savePost = await new postModel({
            userIdToPost: userIdToPost,
            postMsg: postMsg,
            postImgs: req.files.map((e) => e.filename),
        });
        const postData = await savePost.save();
        return res.status(201).json({ msg: 'post created.', postId: postData._id });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const createPostWithVideo = async (req, res) => {
    try {
        const { userIdToPost, postMsg } = req.body;
        const savePost = await new postModel({
            userIdToPost: userIdToPost,
            postMsg: postMsg,
            postVideo: req.file !== undefined ? req.file.filename : '',
        });
        const postData = await savePost.save();
        return res.status(201).json({ msg: 'post created.', postId: postData._id });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const updatePostWithImages = async (req, res) => {
    try {
        const { postId, postMsg } = req.body;
        const postData = await postModel.findById(
            {
                _id: postId
            }
        );
        Promise.all(postData.postImgs.map((e) => {
            return new Promise((resolve, reject) => {
                fs.unlink(path.join(__dirname, `../public/postImg/${e}`), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }))
            .then(() => {
                return true;
            });
        fs.unlink(path.join(__dirname, `../public/postVideo/${postData.postVideo}`), (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
        await postModel.findByIdAndUpdate(
            {
                _id: postId
            },
            {
                postMsg: postMsg,
                postImgs: req.files !== undefined ? req.files.map((e) => e.filename) : [],
                postVideo: "",
            }
        );
        return res.status(200).json({ msg: 'post updated.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const updatePostWithVideo = async (req, res) => {
    try {
        const { postId, postMsg } = req.body;
        const postData = await postModel.findById(
            {
                _id: postId
            }
        );
        fs.unlink(path.join(__dirname, `../public/postVideo/${postData.postVideo}`), (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
        Promise.all(postData.postImgs.map((e) => {
            return new Promise((resolve, reject) => {
                fs.unlink(path.join(__dirname, `../public/postImg/${e}`), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }))
            .then(() => {
                return true;
            });
        await postModel.findByIdAndUpdate(
            {
                _id: postId
            },
            {
                postMsg: postMsg,
                postVideo: req.file !== undefined ? req.file.filename : '',
                postImgs: []
            }
        );
        return res.status(200).json({ msg: 'post updated.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const updatePostWithMsg = async (req, res) => {
    try {
        const { postId, postMsg, deleteCurrentPostImage, deleteCurrentPostVideo } = req.body;
        const postData = await postModel.findById({
            _id: postId,
        });
        if (deleteCurrentPostImage) {
            postData.postImgs.map(async (img) => {
                fs.unlink(path.join(__dirname, `../public/postImg/${img}`), (err) => {
                    if (err) {
                        return false;
                    } else {
                        return true;
                    }
                });
            });
            await postData.updateOne({
                postImgs: [],
            });
        }
        if (deleteCurrentPostVideo) {
            fs.unlink(path.join(__dirname, `../public/postVideo/${postData.postVideo}`), (err) => {
                if (err) {
                    return false;
                } else {
                    return true;
                }
            });
            await postData.updateOne({
                postVideo: "",
            });
        }
        await postModel.findByIdAndUpdate(
            {
                _id: postId
            },
            {
                postMsg: postMsg
            }
        );
        return res.status(200).json({ msg: 'post updated.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.body;
        await notificationModel.deleteMany({
            notificationOfPostId: postId
        });
        const postData = await postModel.findById(
            {
                _id: postId
            }
        );
        const commentOfPostData = await commentModel.find({
            postIdToComment: postId
        });
        commentOfPostData.map(async (e) => {
            const replyData = await replyModel.find({
                commentIdToReply: e?._id
            });
            replyData.map(async (reply) => {
                fs.unlink(path.join(__dirname, `../public/replyImg/${reply.replyImg}`), (err) => {
                    if (err) {
                        return false;
                    } else {
                        return true;
                    }
                });
                await replyModel.findByIdAndDelete({
                    _id: reply?._id
                });
            });
            fs.unlink(path.join(__dirname, `../public/commentImg/${e.commentImg}`), (err) => {
                if (err) {
                    return false;
                } else {
                    return true;
                }
            });
        });
        await commentModel.deleteMany({
            postIdToComment: postId
        });
        Promise.all(postData.postImgs.map((e) => {
            return new Promise((resolve, reject) => {
                fs.unlink(path.join(__dirname, `../public/postImg/${e}`), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }))
            .then(() => {
                return true;
            });
        fs.unlink(path.join(__dirname, `../public/postVideo/${postData.postVideo}`), (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
        await postModel.findByIdAndDelete(
            {
                _id: postId
            }
        );
        return res.status(200).json({ msg: 'post deleted.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const likeAndDislikePost = async (req, res) => {
    try {
        const { postId, userId, userIdToPost } = req.body;
        const postData = await postModel.findById({
            _id: postId
        });
        if (!postData.postLikes.includes(userId)) {
            await postData.updateOne(
                {
                    $push: {
                        postLikes: userId
                    }
                }
            );
            if (userIdToPost !== userId) {
                const notificationData = new notificationModel({
                    notificationOfUserId: userId,
                    notificationOfPostId: postId,
                    notificationDetail: 'Like your post',
                    notificationOfReceiverId: [userIdToPost]
                });
                await notificationData.save();
            }
        } else {
            await postData.updateOne(
                {
                    $pull: {
                        postLikes: userId
                    }
                }
            );
            await notificationModel.findOneAndDelete({
                notificationOfUserId: userId,
                notificationOfPostId: postId,
                notificationDetail: 'Like your post',
            });
        }
        return res.status(200).json({ msg: 'pending success.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find();
        if (!res.headersSent) {
            return res.status(200).json(posts);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const blockPost = async (req, res) => {
    try {
        const { postId } = req.body;
        const post = await postModel.findById({ _id: postId });
        const sharePost = await sharePostModel.findById({ _id: postId });

        if (post) {
            if (post.isBlock) {
                await post.updateOne(
                    {
                        isBlock: false
                    }
                );
            } else {
                await post.updateOne(
                    {
                        isBlock: true
                    }
                );
            }
        }

        if (sharePost) {
            if (sharePost.isBlock) {
                await sharePost.updateOne(
                    {
                        isBlock: false
                    }
                );
            } else {
                await sharePost.updateOne(
                    {
                        isBlock: true
                    }
                );
            }
        }

        return res.status(200).json({ msg: "successfully." });
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    createPostWithMsg,
    createPostWithImages,
    createPostWithVideo,
    updatePostWithImages,
    updatePostWithVideo,
    updatePostWithMsg,
    deletePost,
    likeAndDislikePost,
    getAllPosts,
    blockPost
}