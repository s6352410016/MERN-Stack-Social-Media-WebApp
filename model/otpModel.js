const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expireAt: {
        type: Number,
        required: true
    }
} , {
    timestamps: true
});

module.exports = mongoose.model('otps' , otpSchema);