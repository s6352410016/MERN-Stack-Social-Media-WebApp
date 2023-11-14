const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const otpModel = require('../model/otpModel');

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = `${Math.floor(Math.random() * 900000 + 100000)}`; // generate otp 6 digits
        const otpHash = await bcrypt.hash(otp, 10);
        const saveOTP = await new otpModel({
            userEmail: email,
            otp: otpHash,
            expireAt: Date.now() + 600000 // เวลาหมดอายุของ otp = 10 นาที
        });
        await saveOTP.save();
        const transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bynsocial5087@gmail.com',
                pass: 'vwezattbqpijtooa'
            }
        });
        const mailOptions = {
            from: 'bynsocial5087@gmail.com',
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Enter <b>${otp}</b> in the page to verify your email address and complete to reset password process.</p>
                  <p>This code <b>expires in 10 minutes</b>.</p>`
        }
        await transpoter.sendMail(mailOptions);
        return res.status(200).json({ msg: 'OTP has been send to your email.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        await otpModel.deleteMany({
            userEmail: email
        });
        const otp = `${Math.floor(Math.random() * 900000 + 100000)}`; // generate otp 6 digits
        const otpHash = await bcrypt.hash(otp, 10);
        const saveOTP = await new otpModel({
            userEmail: email,
            otp: otpHash,
            expireAt: Date.now() + 600000 // เวลาหมดอายุของ otp = 10 นาที
        });
        await saveOTP.save();
        const transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bynsocial5087@gmail.com',
                pass: 'vwezattbqpijtooa'
            }
        });
        const mailOptions = {
            from: 'bynsocial5087@gmail.com',
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Enter <b>${otp}</b> in the page to verify your email address and complete to reset password process.</p>
                  <p>This code <b>expires in 10 minutes</b>.</p>`
        }
        await transpoter.sendMail(mailOptions);
        return res.status(200).json({ msg: 'OTP has been resend to your email.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const doc = await otpModel.findOne({
            userEmail: email
        });
        if (doc) {
            if (Date.now() < doc.expireAt) {
                const result = await bcrypt.compare(otp, doc.otp);
                if (result) {
                    await otpModel.deleteMany({
                        userEmail: email
                    });
                    return res.status(200).json({ msg: 'Verify otp successfully.' });
                } else {
                    return res.status(400).json({ msg: 'Invalid otp.' });
                }
            } else {
                await otpModel.deleteMany({
                    userEmail: email
                });
                return res.status(400).json({ msg: 'OTP has expire.' });
            }
        } else {
            return res.status(400).json({ msg: 'Invalid email address.' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    sendOTP,
    resendOTP,
    verifyOTP
}