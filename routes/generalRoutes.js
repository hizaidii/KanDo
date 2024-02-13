const path = require("path");
const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const generalController = require("../controllers/generalController");

router.get("/", generalController.getIndex);
router.get("/signup", generalController.getSignup);
router.post("/signup", generalController.postSignup);
router.post("/login", generalController.postLogin);

module.exports = router;
