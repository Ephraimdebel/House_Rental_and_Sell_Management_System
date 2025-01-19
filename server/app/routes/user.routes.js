const express = require("express");
const router = express.Router();
const { register, login, checkUser, updateUserRoleToHost, updateUserRoleToGuest,getAllUsers, deleteUser } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth_middle_ware");
const adminMiddleware = require("../middlewares/admin_middle_ware");

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser",authMiddleware, checkUser);
router.get("/getAllUsers",authMiddleware, getAllUsers);
router.put("/:userId/role/host", authMiddleware, updateUserRoleToHost);  // Update role to host
router.put("/:userId/role/guest", authMiddleware, updateUserRoleToGuest); // Update role to guest
router.delete("/user/:id", authMiddleware, deleteUser); // Route to delete user by ID

module.exports = router;
