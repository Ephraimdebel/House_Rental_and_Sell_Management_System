const express = require("express");
const router = express.Router();

//authetication middleware
const authMiddleware = require("../middlewares/auth_middle_ware");
const {
  getPosts,
  deletePost,
  createPost,
} = require("../controllers/post_controller_to_be_tried_with_AWS_S3.JS");

router.get("/getPost", getPosts);
router.post("/createPost", authMiddleware, createPost);
router.delete("/deletePost/:id", authMiddleware, deletePost);
module.exports = router;
