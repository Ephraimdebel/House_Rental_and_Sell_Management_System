const express = require("express");
const router = express.Router();
const { register, login, checkUser } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth_middle_ware");

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser",authMiddleware, checkUser);

module.exports = router;
