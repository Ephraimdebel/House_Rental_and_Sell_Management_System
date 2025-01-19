
const { createBooking, updateBookingStatus, getHostBookings } = require("../controllers/booking.controller");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middle_ware");


router.post("/booking/:host_id/:listing_id",authMiddleware, createBooking);
router.put("/booking/:booking_id/status",authMiddleware, updateBookingStatus);
router.get("/bookings",authMiddleware, getHostBookings);

module.exports = router;