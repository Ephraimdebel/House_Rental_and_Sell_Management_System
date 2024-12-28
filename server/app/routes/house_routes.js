const express = require("express");
const router = express.Router();

const {
  getHouse,
  addHouse,
  deleteHouse,
  updateHouse,
} = require("../controllers/house_controller");

router.get("/house", getHouse);
router.post("/addHouse", addHouse);
router.delete("/deleteHouse/:houseId", deleteHouse);
router.put("/updateHouse/:houseId", updateHouse);

module.exports = router;
router.get("/house", getHouse);