const commentModel = require('../model/commentModel');
const fs = require('fs');
const path = require('path');

const createComment = async (req , res) => {
    try{
        const {postIdToComment , userIdToComment , commentMsgs} = req.body;
        const saveComment = await new commentModel(
            {
                postIdToComment: postIdToComment,
                userIdToComment: userIdToComment,
                commentMsgs: commentMsgs,
                commentImg: req.file !== undefined ? req.file.filename : ''
            }
        );
        await saveComment.save();
        res.status(201).json({msg: 'comment created'});
    }catch(err){
        res.status(500).json(err);
    }
}

const updateCommentWithImage = async (req , res) => {
    try{
        const {commentId , commentMsgs} = req.body;
        const commentData = await commentModel.findById(
            {
                _id: commentId
            }
        );
        fs.unlink(path.join(__dirname , `../public/commentImg/${commentData.commentImg}`) , (err) => {
            if(err){
                return false;
            }else{
                return true;
            }
        });
        await commentData.updateOne(
            {
                commentImg: req.file !== undefined ? req.file.filename : '',
                commentMsgs: commentMsgs
            }
        );
        res.status(200).json({msg: 'comment updated.'});
    }catch(err){
        res.status(500).json(err);
    }
}

const updateCommentWithMsgs = async (req , res) => {
    try{
        const {commentId , commentMsgs} = req.body;
        await commentModel.findByIdAndUpdate(
            {
                _id: commentId
            },
            {
                commentMsgs: commentMsgs
            }
        );
        res.status(200).json({msg: 'comment updated.'});
    }catch(err){
        res.status(500).json(err);
    }
}

const deleteComment = async (req , res) => {
    try{
        const {commentId} = req.body;
        const commentData = await commentModel.findById(
            {
                _id: commentId
            }
        );
        fs.unlink(path.join(__dirname , `../public/commentImg/${commentData.commentImg}`) , (err) => {
            if(err){
                return false;
            }else{
                return true;
            }
        });
        await commentData.deleteOne();
        res.status(200).json({msg: 'comment deleted.'});
    }catch(err){
        res.status(500).json(err);
    }
}

const getAllComments = async (req , res) => {
    try{
        const comments = await commentModel.find();
        res.status(200).json(comments);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    createComment,
    updateCommentWithImage,
    updateCommentWithMsgs,
    deleteComment,
    getAllComments
}