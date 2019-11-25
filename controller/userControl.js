const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const userRegister = (req, res, next) => {
    const { name, email, password, isAdmin } = req.body;
    User.findOne({ email, }, (err, data) => {
        if (err) return next(err);
        if (data) {
            return res.status(400).json({
                message: 'User has been registered already'
            })
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) return next (err)
                    const newUser = new User({
                        name,
                        password: hash,
                        email,
                        isAdmin
                    })
                    newUser.save((err) => {
                        if (err) {
                            return next(err);
                        } else {
                            console.log(newUser)
                            return res.status(201).json({
                                message: 'User created successfully'
                            })
                        }
                    })
                })
            })
        }
    })
}
const userLogin = (req, res) => {
    const { name, email, password } = req.body;
    User.findOne( { email }, (err, data) => {
        if (err) return next(err);
        if (!data) {
            return res.status(401).json({
                message: "User doesn't exist"
            })
        } else {
            if (name !== data.name && password !== data.password) {
                return res.status(401).json({
                    message: "Invalid name/password"
                })
            } else {
                const token = jwt.sign({ isAdmin: data.isAdmin }, process.env.SECRET, { expiresIn: '5h'});
                return res.status(200).json({
                    message: "Logged in Successfully",
                    token
                })
            }
        }
    })
}
const userDisplay = (req, res, next) => {
    User.find((err, data) => {
        if (err) return next (err)
        res.status(200).json({
            message:"users return successfully",
            data
        })
    
    })
}

module.exports = { userRegister, userLogin, userDisplay };