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
            if(doc.isBlock){
                return res.status(403).json({msg: "you has been blocked by admin."});
            }
            
            const result = await bcrypt.compare(password, doc.password);
            if (result) {
                const token = jwt.sign(
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

const adminLogin = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const data = await userModel.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });
        if (!data) {
            return res.status(401).json({ msg: "Invalid credential." });
        }

        if(!(await bcrypt.compare(password, data.password))){
            return res.status(401).json({ msg: "Invalid credential." });
        }

        if (!data.isAdmin) {
            return res.status(401).json({ msg: "Invalid credential." });
        }

        const token = jwt.sign(
            {
                userData: {
                    userId: data._id,
                    firstname: data.firstname,
                    lastname: data.lastname
                }
            },
            process.env.SECRETKEY,
            {
                expiresIn: '24h'
            }
        );
        return res.status(200).json({token});
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    signin,
    adminLogin
}