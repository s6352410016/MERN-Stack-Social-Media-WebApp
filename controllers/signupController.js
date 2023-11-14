const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
require('dotenv').config();

const checkUsername = async (req, res) => {
    try {
        const { username } = req.body;
        const doc = await userModel.findOne({
            username: username
        });
        if (doc) {
            return res.status(400).json({ msg: 'Username is already exist.' });
        }
        return res.status(200).json({ msg: 'Username is available.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const doc = await userModel.findOne({
            email: email
        });
        if (doc) {
            return res.status(400).json({ msg: 'Email is already exist.' });
        }
        return res.status(200).json({ msg: 'Email is available.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const signup = async (req, res) => {
    try {
        const { firstname, lastname, username, password, email } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const saveSignup = await new userModel({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: passwordHash,
            email: email
        });
        await saveSignup.save();
        const token = await jwt.sign(
            {
                userData: {
                    userId: saveSignup._id,
                    firstname: saveSignup.firstname,
                    lastname: saveSignup.lastname,
                }
            },
            process.env.SECRETKEY,
            {
                expiresIn: '24h'
            }
        );
        return res.status(201).json({ token: token });
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    checkUsername,
    checkEmail,
    signup
}