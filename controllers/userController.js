const userModel = require('../model/userModel');

const followAndUnFollow = async(req , res) => {
    try{
        const {activeUserId , userIdToFollow} = req.body;
        const userDataOfuserIdToFollow = await userModel.findById(
            {
                _id: userIdToFollow
            }
        );
        if(!userDataOfuserIdToFollow.follower.includes(activeUserId)){
            await userDataOfuserIdToFollow.updateOne(
                {
                    $push: {
                        follower: activeUserId
                    }
                }
            );
            await userModel.findByIdAndUpdate(
                {
                    _id: activeUserId
                },
                {
                    $push: {
                        following: userIdToFollow
                    }
                }
            );
        }else{
            await userDataOfuserIdToFollow.updateOne(
                {
                    $pull: {
                        follower: activeUserId
                    }
                }
            ); 
            await userModel.findByIdAndUpdate(
                {
                    _id: activeUserId
                },
                {
                    $pull: {
                        following: userIdToFollow
                    }
                }
            );
        }
        res.status(200).json({msg: 'pending success.'});
    }catch(err){
        res.status(500).json(err);
    }
}

const getAllUsers = async (req , res) => {
    try{
        const users = await userModel.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err); 
    }
}

const getUserByUserId = async (req , res) => {
    try{
        const {userId} = req.body;
        const userData = await userModel.findById(
            {
                _id: userId
            }
        );
        res.status(200).json(userData);
    }catch(err){
        res.status(500).json(err); 
    }
}

module.exports = {
    followAndUnFollow,
    getAllUsers,
    getUserByUserId
}