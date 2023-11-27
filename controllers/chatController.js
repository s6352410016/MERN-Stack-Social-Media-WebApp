const chatModel = require('../model/chatModel');

const createChat = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const chatData = await chatModel.findOne({
            members: {
                $all: [senderId, receiverId]
            }
        });
        if (!chatData) {
            const chat = new chatModel({
                members: [senderId, receiverId]
            });
            const savedChat = await chat.save();
            return res.status(201).json(savedChat);
        } else {
            return res.status(400).json({ msg: 'This chat is already saved.' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getAllChatByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const chats = await chatModel.find({
            members: {
                $in: [userId]
            }
        });
        if (!res.headersSent) {
            return res.status(200).json(chats);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const findChat = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;
        const chat = await chatModel.findOne({
            members: {
                $all: [senderId, receiverId]
            }
        });
        if (!res.headersSent) {
            return res.status(200).json(chat);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getAllChats = async (req , res) => {
    try{
        const chats = await chatModel.find();
        return res.status(200).json(chats);
    }catch(err){
        return res.status(500).json(err);
    }
}

const blockChat = async (req, res) => {
    try {
        const { chatId } = req.body;
        const chat = await chatModel.findById({ _id: chatId });
        if (chat) {
            if (chat.isBlock) {
                await chat.updateOne(
                    {
                        isBlock: false
                    }
                );
            } else {
                await chat.updateOne(
                    {
                        isBlock: true
                    }
                );
            }

            return res.status(200).json({ msg: "successfully." });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    createChat,
    getAllChatByUserId,
    findChat,
    getAllChats,
    blockChat
}