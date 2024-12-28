const { query } = require("../../config/db");
const { StatusCodes } = require("http-status-codes");

const getHouse = async (req, res) => {
  try {
    const [house] = await query("SELECT * FROM House");
    res.json(house);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Server error while getting house", error: e });
  }
};

const addHouse = async (req, res) => {
  const { location, imgURL, price, details, ownerId } = req.body;

  // Validate required fields
  if (!location  || !price || !details || !ownerId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message:
        "All fields (location, imgURL, price, details, ownerId) are required",
    });
  }

  try {
    // Insert house details into the database
    const result = await query(
      "INSERT INTO House (location, price, details, ownerId) VALUES (?, ?, ?,  ?)",
      [location, price, details, ownerId]
    );

    // Fetch the newly added house details
    const houseResult = await query("SELECT * FROM House WHERE houseId = ?", [
      result.insertId,
    ]);

    // Check if the house exists
    if (!houseResult || houseResult.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "House was added but could not retrieve its details",
      });
    }

    // Send the response with the house details
    res.status(StatusCodes.CREATED).json({
      ...houseResult[0],
      message: "House added successfully"
    });
  } catch (error) {
    console.error("Error while adding house:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server error while adding house",
      error: error.message,
    });
  }
};

const deleteHouse = async (req, res) => {
  const { HouseId } = req.params;
  try {
    await query("DELETE FROM House WHERE id = ?", [HouseId]);
    res.json({ message: "Product deleted" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error occurred while deleting product", error: e });
  }
};
const updateHouse = async (req, res) => {
  const { houseId } = req.params;
  const { location, imgURL, price, details, ownerId } = req.body;
  try {
    await query(
      "UPDATE House SET location = ?, imgURL = ?, price = ?, details = ?, ownerId = ? WHERE houseId = ?",
      [location, imgURL, price, details, ownerId, houseId]
    );
    const [updatedHouse] = await query(
      "SELECT * FROM House WHERE houseId = ?",
      [houseId]
    );
    res.json(updatedHouse);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Server error while updating house", error: e });
  }
};

module.exports = { getHouse, addHouse, deleteHouse, updateHouse };
