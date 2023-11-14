const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signin = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const doc = await userModel.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });
        if (doc) {
            const result = await bcrypt.compare(password, doc.password);
            if (result) {
                const token = await jwt.sign(
                    {
                        userData: {
                            userId: doc._id,
                            firstname: doc.firstname,
                            lastname: doc.lastname
                        }
                    },
                    process.env.SECRETKEY,
                    {
                        expiresIn: '24h'
                    }
                );
                return res.status(200).json({ token: token });
            }
        }
        return res.status(400).json({ msg: 'Invalid username or password' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    signin
}