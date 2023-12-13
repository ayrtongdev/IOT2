require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const WithAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');

    if (!token)
        res.status(401).json({ error: 'Unauthorized: no token provided' });
    else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Unauthorized: token invalid' });
            } else {
                User.findOne({ email: decoded.email })
                    .then(user => {
                        if (!user) {
                            res.status(401).json({ error: 'User not found' });
                        } else {
                            req.user = user;
                            console.log('Authenticated user:', req.user);
                            next();
                        }
                    })
                    .catch(err => {
                        res.status(401).json({ error: err.message });
                    })
            }
        })
    }
}
module.exports = WithAuth;