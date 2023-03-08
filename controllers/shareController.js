const shareModel = require('../model/shareModel');

const createSharePost = async (req , res) => {
    try{
        const {postIdToShare , userIdToShare , shareMsg} = req.body;
        const saveSharePost = await new shareModel(
            {
                postIdToShare: postIdToShare,
                userIdToShare: userIdToShare,
                shareMsg: shareMsg
            }
        );
        await saveSharePost.save();
        res.status(201).json({msg: 'share post created.'});
    }catch(err){
        res.status(500).json(err);
    }
}

const updateSharePost = async (req , res) => {
    try{
        const {shareId , shareMsg} = req.body;
        await shareModel.findByIdAndUpdate(
            {
                _id: shareId
            },
            {
                shareMsg: shareMsg
            }
        );
        res.status(200).json({msg: 'share post updated.'});
    }catch(err){
        res.status(500).json(err);
    }
}

const deleteSharePost = async (req , res) => {
    try{
        const {shareId} = req.body;
        await shareModel.findByIdAndDelete(
            {
                _id: shareId
            }
        );
        res.status(200).json({msg: 'share post deleted.'});
    }catch(err){
        res.status(500).json(err);
    }
}

const sharePostLikeAndDislike = async (req , res) => {
    try{
        const {shareId , userId} = req.body;
        const sharePostData = await shareModel.findById(
            {
                _id: shareId
            }
        );
        if(!sharePostData.sharePostLikes.includes(userId)){
            await sharePostData.updateOne(
                {
                    $push: {
                        sharePostLikes: userId
                    }
                }
            );
        }else{
            await sharePostData.updateOne(
                {
                    $pull: {
                        sharePostLikes: userId
                    }
                }
            ); 
        }
        res.status(200).json({msg: 'pending success.'});
    }catch(err){
        res.status(500).json(err);
    }
}

const getAllSharePost = async (req , res) => {
    try{
        const sharePosts = await shareModel.find();
        res.status(200).json(sharePosts);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    createSharePost,
    updateSharePost,
    deleteSharePost,
    sharePostLikeAndDislike,
    getAllSharePost
}