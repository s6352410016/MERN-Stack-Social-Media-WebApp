const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await userModel.findOneAndUpdate(
            { email: email },
            { password: passwordHash }
        );
        return res.status(200).json({ msg: 'Successfully to reset password.' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    resetPassword
}