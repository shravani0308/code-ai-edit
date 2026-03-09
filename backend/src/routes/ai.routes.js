const express = require("express");
const aiController = require("../controllers/ai.controller");
const { authenticate } = require ("../middleware/auth.middleware");

const router = express.Router();

router.post("/get-response",authenticate, aiController.getResponse);

module.exports = router;