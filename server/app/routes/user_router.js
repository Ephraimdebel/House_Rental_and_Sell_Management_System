const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user_controller");

const {getHouse, addHouse, deleteHouse, updateHouse} = require("../controllers/house_controller");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
