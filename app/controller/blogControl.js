const Blog = require('from blog Schema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// Blog entry controls here
const blogEntry = (req, res, next) => {
    const { title, author, post } = req.body;

    // Assuming the req.user from the token verification is the admin status, then
    if ( req.user !== true) {
        return res.status(401).json({
            message: "You need to be an admin to post a story"
        })
    } else {
        const newEntry = new Blog ({
            title,
            author,
            post
        })
        newEntry.save((err) => {
            if (err) {
                return next(err)
            } else {
                return res.status(201).json({
                    message: "New Story created"
                })
            }
        })
    }
}

// Blog update
const blogUpdate = (req, res) => {
    const { title, author, post } = req.body;
    Blog.findByIdAndUpdate( req.params.id, { title: title, author: author, post: post }, (err, data) => {
        if (err) return next(err);
        if (!data) {
            return res.status(401).json({
                message: "No Blog entry for this id"
            })
        } else {
            return res.status(201).json({
                message: "Story Updated"
            })
        }
    })
}

// Deleting a post
const blogDelete = (req, res) => {
    Blog.delete( req.params.id, (err, data) => {
        if (err) return next(err);
        if (!data) {
            return res.status(401).json({
                message: "No Blog entry for this id"
            })
        } else {
            return res.status(201).json({
                message: "Story Deleted"
            })
        }
    })
}