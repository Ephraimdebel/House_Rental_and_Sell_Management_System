const express = require("express");
const router = express.Router();
const { register, login, checkUser, updateUserRoleToHost, updateUserRoleToGuest,getAllUsers } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth_middle_ware");

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser",authMiddleware, checkUser);
router.get("/getAllUsers",authMiddleware, getAllUsers);
router.put("/:userId/role/host", authMiddleware, updateUserRoleToHost);  // Update role to host
router.put("/:userId/role/guest", authMiddleware, updateUserRoleToGuest); // Update role to guest

module.exports = router;
