const express = require("express");
const router = express.Router();

const {
  addHouse,
  getHouseDetails,
  getAllListings,
  getListingsByType,
  getFilteredHouses,
  deleteProperty,
  getAllListingsNew,
} = require("../controllers/house.controller");

const authMiddleware = require("../middlewares/auth_middle_ware");
const upload = require("../../utils/uploads");

router.get("/house", getAllListings);
router.get("/houses", getAllListingsNew);
router.post("/addHouse",upload.array('photos',5),authMiddleware, addHouse);
router.get("/house/:id", getHouseDetails)
router.delete("/house/:id",authMiddleware, deleteProperty)
router.get("/housetype", getListingsByType)
router.get("/filteredhouse", getFilteredHouses)


module.exports = router;
