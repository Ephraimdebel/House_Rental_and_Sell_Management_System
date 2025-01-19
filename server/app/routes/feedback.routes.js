const express = require("express");
const router = express.Router();
const { createReview, getReviews } = require("../controllers/feedback.controller");

const authMiddleware = require("../middlewares/auth_middle_ware");

router.post("/reviews/:propertyId",authMiddleware, createReview);
router.get("/reviews/:id",authMiddleware, getReviews);

module.exports = router;