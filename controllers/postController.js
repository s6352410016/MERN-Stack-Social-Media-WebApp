const postModel = require('../model/postModel');
const fs = require('fs');
const path = require('path');

const createPostWithImages = async (req, res) => {
    try {
        const { userIdToPost, postMsg, postLikes } = req.body;
        const savePost = await new postModel({
            userIdToPost: userIdToPost,
            postMsg: postMsg,
            postImgs: req.files.map((e) => e.filename),
            postLikes: postLikes
        });
        await savePost.save();
        res.status(201).json({ msg: 'post created.' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const createPostWithVideo = async (req, res) => {
    try {
        const { userIdToPost, postMsg, postLikes } = req.body;
        const savePost = await new postModel({
            userIdToPost: userIdToPost,
            postMsg: postMsg,
            postVideo: req.file !== undefined ? req.file.filename : '',
            postLikes: postLikes
        });
        await savePost.save();
        res.status(201).json({ msg: 'post created.' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updatePostWithImages = async (req, res) => {
    try {
        const { _id, postMsg } = req.body;
        const postData = await postModel.findById(
            {
                _id: _id
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
                _id: _id
            },
            {
                postMsg: postMsg,
                postImgs: req.files.map((e) => e.filename),
                postVideo: ''
            }
        );
        res.status(200).json({ msg: 'post updated.' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updatePostWithVideo = async (req, res) => {
    try {
        const { _id, postMsg } = req.body;
        const postData = await postModel.findById(
            {
                _id: _id
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
                _id: _id
            },
            {
                postMsg: postMsg,
                postVideo: req.file.filename,
                postImgs: []
            }
        );
        res.status(200).json({ msg: 'post updated.' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updatePostWithMsg = async (req, res) => {
    try {
        const { _id, postMsg } = req.body;
        await postModel.findByIdAndUpdate(
            {
                _id: _id
            },
            {
                postMsg: postMsg
            }
        );
        res.status(200).json({ msg: 'post updated.' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const deletePost = async (req, res) => {
    try {
        const { _id } = req.body;
        const postData = await postModel.findById(
            {
                _id: _id
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
        await postModel.findByIdAndDelete(
            {
                _id: _id
            }
        );
        res.status(200).json({ msg: 'post deleted.' });
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createPostWithImages,
    createPostWithVideo,
    updatePostWithImages,
    updatePostWithVideo,
    updatePostWithMsg,
    deletePost
}