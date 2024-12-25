const express = require("express");
const router = express.Router();


const {register } = require("../controllers/user_controller");
router.post("/register", register);

module.exports = router;
