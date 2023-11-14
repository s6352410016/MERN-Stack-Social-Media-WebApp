const userModel = require('../model/userModel');
const fs = require('fs');
const path = require('path');
const notificationModel = require('../model/notificationModel');

const followAndUnFollow = async (req, res) => {
    try {
        const { activeUserId, userIdToFollow } = req.body;
        const userDataOfuserIdToFollow = await userModel.findById(
            {
                _id: userIdToFollow
            }
        );
        if (!userDataOfuserIdToFollow.follower.includes(activeUserId)) {
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
            const notificationData = new notificationModel({
                notificationOfUserId: activeUserId,
                notificationDetail: 'Following you',
                notificationOfReceiverId: [userIdToFollow],
            });
            await notificationData.save();
        } else {
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
            await notificationModel.findOneAndDelete({
                notificationOfUserId: activeUserId,
                notificationDetail: 'Following you',
                notificationOfReceiverId: [userIdToFollow],
            });
        }
        return res.status(200).json({ msg: 'pending success.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, '_id firstname lastname follower following dateOfBirth profilePicture profileBackground otherDetail createdAt updatedAt');
        if (!res.headersSent) {
            return res.status(200).json(users);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getUserByUserId = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findOne(
            {
                _id: userId
            }
        );
        if (userData) {
            return res.status(200).json(userData);
        }
        return res.status(404).json({ msg: "user not found." });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const uploadProfileImg = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await userModel.findById(
            {
                _id: id
            }
        );
        fs.unlink(path.join(__dirname, `../public/userProfileImg/${userData.profilePicture}`), (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
        await userModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                profilePicture: req.file.filename
            }
        );
        return res.status(200).json({ msg: 'profile picture uploaded successfully.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const uploadProfileBgImg = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await userModel.findById(
            {
                _id: id
            }
        );
        fs.unlink(path.join(__dirname, `../public/userProfileBgImg/${userData.profileBackground}`), (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
        await userModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                profileBackground: req.file.filename
            }
        );
        return res.status(200).json({ msg: 'profile background picture uploaded successfully.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const updateOtherDetailOfUserByUserId = async (req, res) => {
    try {
        const { firstname, lastname, dateOfBirth, otherDetail } = req.body;
        const { id } = req.params;
        await userModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                firstname: firstname,
                lastname: lastname,
                dateOfBirth: dateOfBirth,
                otherDetail: otherDetail
            }
        );
        return res.status(200).json({ msg: 'user detail updated successfully.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deleteCurrentProfileImg = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(
            {
                _id: userId,
            },
        );
        if (userData.profilePicture !== "") {
            fs.unlink(path.join(__dirname, `../public/userProfileImg/${userData.profilePicture}`), async (err) => {
                if (!err) {
                    await userData.updateOne({
                        profilePicture: "",
                    });
                    return res.status(200).json({ msg: 'delete current profile img successfully.' });
                }
            });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deleteCurrentProfileBgImg = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(
            {
                _id: userId,
            },
        );
        if (userData.profileBackground !== "") {
            fs.unlink(path.join(__dirname, `../public/userProfileBgImg/${userData.profileBackground}`), async (err) => {
                if (!err) {
                    await userData.updateOne({
                        profileBackground: "",
                    });
                    return res.status(200).json({ msg: 'delete current profile background img successfully.' });
                }
            });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const checkUserExistUpdateProfile = async (req , res) => {
    try{
        const { firstname , userId } = req.body;
        const userExistWithFirstName = await userModel.findOne({
            firstname
        });
        // const userExistWithLastName = await userModel.findOne({
        //     lastname
        // });
        
        // if(userExistWithFirstName && userExistWithLastName && userExistWithFirstName._id.toString() !== userId && userExistWithLastName._id.toString() !== userId){
        //     return res.status(400).json({msg: "fristname and lastname is already exist."});
        // }
        if(userExistWithFirstName && userExistWithFirstName._id.toString() !== userId){
            return res.status(400).json({msg: "fristname is already exist."});
        }
        // if(userExistWithLastName && userExistWithLastName._id.toString() !== userId){
        //     return res.status(400).json({msg: "lastname is already exist."});
        // }

        return res.status(200).json({msg: "fristname is already use."});
    }catch(err){
        return res.status(500).json(err);
    }
}

module.exports = {
    followAndUnFollow,
    getAllUsers,
    getUserByUserId,
    uploadProfileImg,
    uploadProfileBgImg,
    updateOtherDetailOfUserByUserId,
    deleteCurrentProfileImg,
    deleteCurrentProfileBgImg,
    checkUserExistUpdateProfile
}