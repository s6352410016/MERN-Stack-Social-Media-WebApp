const postModel = require('../model/postModel');
const fs = require('fs');
const path = require('path');

const createPostWithMsg = async (req , res) => {
    try{
        const { userIdToPost, postMsg } = req.body;
        const savePost = await new postModel({
            userIdToPost: userIdToPost,
            postMsg: postMsg
        });
        await savePost.save();
        res.status(201).json({ msg: 'post created.' });
    }catch(err){
        res.status(500).json(err);
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
        await savePost.save();
        res.status(201).json({ msg: 'post created.' });
    } catch (err) {
        res.status(500).json(err);
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
        await savePost.save();
        res.status(201).json({ msg: 'post created.' });
    } catch (err) {
        res.status(500).json(err);
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
                postVideo: req.file !== '' ? req.file.filename : '',
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
        const { postId, postMsg } = req.body;
        await postModel.findByIdAndUpdate(
            {
                _id: postId
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
        const { postId } = req.body;
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
        await postModel.findByIdAndDelete(
            {
                _id: postId
            }
        );
        res.status(200).json({ msg: 'post deleted.' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const likeAndDislikePost = async (req , res) => {
    try{
        const {postId , userId} = req.body;
        const postData = await postModel.findById({
            _id: postId
        });
        if(!postData.postLikes.includes(userId)){
            await postData.updateOne(
                {
                    $push: {
                        postLikes: userId
                    }
                }
            );
        }else{
            await postData.updateOne(
                {
                    $pull: {
                        postLikes: userId
                    }
                }
            );
        }
        res.status(200).json({msg: 'pending success.'});
    }catch(err){
        res.status(500).json(err);
    }
}

const getAllPosts = async (req , res) => {
    try{
        const posts = await postModel.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
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
    getAllPosts
}