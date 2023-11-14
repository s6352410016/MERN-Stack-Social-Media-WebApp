const notificationModel = require('../model/notificationModel');

const createNotification = async (req, res) => {
    try {
        const { notificationOfUserId, notificationOfPostId, notificationOfCommentId, notificationDetail, notificationOfReceiverId, notificationOfReplyId } = req.body;
        const saveNotification = await new notificationModel({
            notificationOfUserId: notificationOfUserId,
            notificationOfPostId: notificationOfPostId,
            notificationOfCommentId: notificationOfCommentId,
            notificationOfReplyId: notificationOfReplyId,
            notificationDetail: notificationDetail,
            notificationOfReceiverId: notificationOfReceiverId
        });
        await saveNotification.save();
        return res.status(201).json({ msg: 'Notification created successfully.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const updateUserToReadNotification = async (req, res) => {
    try {
        const { userIdToRead } = req.body;
        const notificationData = await notificationModel.find();
        notificationData.map(async (e) => {
            if (!e.read.includes(userIdToRead)) {
                await e.updateOne({
                    $push: {
                        read: userIdToRead
                    }
                });
            }
        });
        return res.status(200).json({ msg: 'Notification updated successfully.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getAllNotification = async (req, res) => {
    try {
        const notificationData = await notificationModel.find();
        return res.status(200).json(notificationData);
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    createNotification,
    getAllNotification,
    updateUserToReadNotification
}