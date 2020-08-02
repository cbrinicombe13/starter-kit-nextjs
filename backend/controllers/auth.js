const User = require('../models/user');
const shortId = require('shortid');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(user) {
            return res.status(400).json({
                error: 'Email already exists'
            });
        }

        const { name, email, password } = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({
            name, email, password, profile, username
        });
        newUser.save((err, success) => {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({ user: success, message: 'Success' });
        })
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if(err || !user) {
            return response.status(400).json({
                error: 'Invalid email/password'
            });
        }

        if(!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            });
        }

        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, email, name, role } = user;
        return res.status(200).json({
            token,
            user: { _id, username, email, name, role }
        });
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Sign Out Success'
    });
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

exports.authMiddleware = (req, res, next) => {
    const userId = req.user._id;
    User.findById({
        _id: userId
    }).exec((err, user) => {
        if(err || !user) {
            res.status(404).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
}

exports.adminMiddleware = (req, res, next) => {
    const userId = req.user._id;
    User.findById({
        _id: userId
    }).exec((err, user) => {
        if(err || !user) {
            res.status(404).json({
                error: 'User not found'
            });
        }
        if(user.role != 1) {
            res.status(404).json({
                error: 'Access denied'
            });
        }
        req.profile = user;
        next();
    });
}