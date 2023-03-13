const jwt = require('jsonwebtoken');
require('dotenv').config();

const authUser = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            res.status(401).json({ msg: 'Unauthorized.' });
        } else {
            jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
                if (err) {
                    res.status(403).json({ msg: 'Forbidden' });
                } else {
                    res.status(200).json({ userId: decoded.userData.userId, firstname: decoded.userData.firstname, lastname: decoded.userData.lastname });
                }
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    authUser
}