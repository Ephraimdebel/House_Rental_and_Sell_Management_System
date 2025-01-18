const express = require("express");
const router = express.Router();
const { createPurchase } = require("../controllers/perchase.controller");

router.post("/purchases/:listing_id", createPurchase);

module.exports = router;