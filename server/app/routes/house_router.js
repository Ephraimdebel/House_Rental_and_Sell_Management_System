const express = require("express");
const router = express.Router();

const {
  getHouse,
  addHouse,
  deleteHouse,
  updateHouse,
  filter,
} = require("../controllers/house_controller");

//authetication middleware
const authMiddleware = require("../middlewares/auth_middle_ware");

router.get("/house", getHouse);
router.post("/addHouse",authMiddleware, addHouse);
router.delete("/deleteHouse/:houseId",authMiddleware, deleteHouse);
router.put("/updateHouse/:houseId",authMiddleware, updateHouse);
router.get("/filter", filter);

module.exports = router;
router.get("/house", getHouse);
