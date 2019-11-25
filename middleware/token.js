const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../models/user')

module.exports = (req, res, next) => {
    const verification =req.headers.authorization;
    if(!verification) {
        res.status(401).json({
            message:"You do not possess an authorization header"
        })
    } else {
        const token = verification.slice(7);
        jwt.verify(token, process.env.SECRET, (err, data) => {
            if (err) {
                return next(err);
            } else {
                User.find((err) => {
                    if (err) return next (err);
                    else {
                        console.log(req.user)
                        req.user = data.isAdmin;
                        next();
                    }
                })
            }
        })
    }
}