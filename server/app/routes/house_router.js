const express = require("express");
const router = express.Router();

const {
  addHouse,
  getHouseDetails,
  getAllListings,
  getListingsByType,
} = require("../controllers/house_controller");

const authMiddleware = require("../middlewares/auth_middle_ware");
const upload = require("../../utils/uploads");

router.get("/house", getAllListings);
router.post("/addHouse",upload.array('listingPhotos',5),authMiddleware, addHouse);
router.get("/house/:id", getHouseDetails)
router.get("/housetype", getListingsByType)


module.exports = router;
