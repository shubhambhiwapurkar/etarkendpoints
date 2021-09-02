var express = require('express');
var router = express.Router();
const { check } = require('express-validator');
const { signout, signup, signin, isSignedIn, login } = require("../controllers/auth")

router.post("/signup", [
        check("name", "name should be at least 3 char").isLength({ min: 3 }),
        check("email", "email is required").isEmail(),
        check("password", "password should be at least 3 char").isLength({ min: 8 }),
    ],
    signup);


router.post("/login", [
        check("email", "email is required").isEmail(),
        check("password", "password field is required").isLength({ min: 8 }),
    ],
    login);


router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
    res.send("a protected route")

});
module.exports = router;