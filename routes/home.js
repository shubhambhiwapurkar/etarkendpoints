const express = require("express")
const router = express.Router()

const { isAuthenticated, isSignedIn } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")


//params
router.param("userID", getUserById);

router.post("/category/create/:userId", isSignedIn, isAuthenticated);

module.exports = router;