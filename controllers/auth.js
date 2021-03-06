const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });

    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "not able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id

        });
    })
};


exports.login = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });

    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "user doesnt not exist"
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "user and pass doesnot match"
            });
        }
        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        //frontend response
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
    });
};

exports.verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};


exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "user signout success"
    });
};


//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});


//custom middleware

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

//home endpoint with token only