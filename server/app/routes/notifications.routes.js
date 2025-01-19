const express = require("express");
const router = express.Router();
const {getNotifications } = require("../controllers/notification.controller");
const authMiddleware = require("../middlewares/auth_middle_ware");

router.get("/all",authMiddleware, getNotifications);

module.exports = router;