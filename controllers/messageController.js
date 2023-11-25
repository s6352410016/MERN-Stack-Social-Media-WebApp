const path = require('path');
const messageModel = require('../model/messageModel');
const chatModel = require('../model/chatModel');
const fs = require('fs/promises');

const createMessage = async (req, res) => {
    try {
        const { chatId, senderId, chatMsg } = req.body;
        const saveMessage = new messageModel({
            chatId: chatId,
            senderId: senderId,
            chatMsg: chatMsg,
            chatImages: req.files !== undefined ? req.files.map((e) => e.filename) : []
        });
        const msgData = await saveMessage.save();
        return res.status(201).json(msgData);
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getMessage = async (req, res) => {
    try {
        const { chatId } = req.body;
        const message = await messageModel.find({
            chatId: chatId
        });
        if (!res.headersSent) {
            return res.status(200).json(message);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getLastMessageByChatId = async (req, res) => {
    try {
        const { chatId } = req.body;
        const message = await messageModel.findOne({
            chatId: chatId
        }).sort({
            createdAt: -1
        }).limit(1);
        if (!res.headersSent) {
            return res.status(200).json(message);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deleteMsg = async (req, res) => {
    try {
        await messageModel.deleteMany();
        return res.status(200).json({ msg: 'deleted all messages successfully' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deleteMsgByChatId = async (req, res) => {
    try {
        const { chatId } = req.body;
        const msgData = await messageModel.find({
            chatId: chatId
        });
        msgData.map((msg) => {
            msg.chatImages.map(async (image) => {
                await fs.unlink(path.join(__dirname, `../public/chatImg/${image}`));
            });
        });
        await messageModel.deleteMany({
            chatId: chatId
        });
        await chatModel.findByIdAndDelete({
            _id: chatId
        });
        return res.status(200).json({ msg: 'deleted all messages successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllMessages = async (req , res) => {
    try{
        const messages = await messageModel.find();
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    createMessage,
    getMessage,
    getLastMessageByChatId,
    deleteMsg,
    deleteMsgByChatId,
    getAllMessages
}