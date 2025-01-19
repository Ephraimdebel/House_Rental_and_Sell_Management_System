const express = require("express");
const router = express.Router();

const {
  addHouse,
  getHouseDetails,
  getAllListings,
  getListingsByType,
  getFilteredHouses,
} = require("../controllers/house.controller");

const authMiddleware = require("../middlewares/auth_middle_ware");
const upload = require("../../utils/uploads");

router.get("/house", getAllListings);
router.post("/addHouse",upload.array('photos',5),authMiddleware, addHouse);
router.get("/house/:id", getHouseDetails)
router.get("/housetype", getListingsByType)
router.get("/filteredhouse", getFilteredHouses)


module.exports = router;
