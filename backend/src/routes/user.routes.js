const express = require("express");
const { register, login, logout } = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;