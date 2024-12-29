const { query } = require("../../config/db");
const { StatusCodes } = require("http-status-codes");

const getHouse = async (req, res) => {
  try {
    // Fetch all houses from the database
    const houses = await query("SELECT * FROM House");

    // Handle case where no houses are found
    if (houses.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No houses found",
      });
    }

    // Respond with the list of houses
    res.status(StatusCodes.OK).json(houses);
  } catch (error) {
    console.error("Error while fetching houses:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server error while retrieving houses",
      error: error.message,
    });
  }
};

const addHouse = async (req, res) => {
  const { location, imgURL, price, details, ownerId } = req.body;

  // Validate required fields
  if (!location || !price || !details || !ownerId) {
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
      message: "House added successfully",
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
  const { houseId } = req.params; // Corrected casing for consistency and readability

  // Validate required parameter
  if (!houseId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "House ID is required",
    });
  }

  try {
    // Check if the house exists
    const [existingHouse] = await query(
      "SELECT * FROM House WHERE houseId = ?",
      [houseId]
    );

    if (!existingHouse) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `No house found with ID: ${houseId}`,
      });
    }

    // Delete the house
    await query("DELETE FROM House WHERE houseId = ?", [houseId]);

    // Return success response
    res.status(StatusCodes.OK).json({
      message: `House with ID: ${houseId} successfully deleted`,
    });
  } catch (error) {
    console.error("Error while deleting house:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error occurred while deleting the house",
      error: error.message,
    });
  }
};

const updateHouse = async (req, res) => {
  const { houseId } = req.params;
  const { location, imgURL, price, details, ownerId } = req.body;

  // Validate required fields
  if (!houseId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "House ID is required",
    });
  }

  if (!location || !price || !details || !ownerId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Location, price, details, and owner ID are required",
    });
  }

  try {
    // Check if the house exists
    const [existingHouse] = await query(
      "SELECT * FROM House WHERE houseId = ?",
      [houseId]
    );

    if (!existingHouse) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `No house found with ID: ${houseId}`,
      });
    }

    // Update the house record
    await query(
      "UPDATE House SET location = ?, price = ?, details = ?, ownerId = ? WHERE houseId = ?",
      [location, price, details, ownerId, houseId]
    );

    // Fetch the updated house details
    const [updatedHouse] = await query(
      "SELECT * FROM House WHERE houseId = ?",
      [houseId]
    );

    // Return the updated house
    res.status(StatusCodes.OK).json({
      ...updatedHouse,
      message: "House updated successfully",
    });
  } catch (error) {
    console.error("Error while updating house:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server error while updating house",
      error: error.message,
    });
  }
};
const filter = async (req, res) => {
  const { location, minPrice, maxPrice } = req.query;
  let queryStr = "SELECT * FROM House WHERE 1=1";
  const params = [];

  // Check for location filter
  if (location) {
    queryStr += " AND location = ?";
    params.push(location);
  }

  // Check for minimum price filter
  if (minPrice) {
    const minPriceValue = parseFloat(minPrice);
    if (!isNaN(minPriceValue)) {
      queryStr += " AND price >= ?";
      params.push(minPriceValue);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid minimum price value",
      });
    }
  }

  // Check for maximum price filter
  if (maxPrice) {
    const maxPriceValue = parseFloat(maxPrice);
    if (!isNaN(maxPriceValue)) {
      queryStr += " AND price <= ?";
      params.push(maxPriceValue);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid maximum price value",
      });
    }
  }

  try {
    const houses = await query(queryStr, params);

    if (houses.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No houses match the search criteria",
      });
    }

    res.status(StatusCodes.OK).json(houses);
  } catch (error) {
    console.error("Error while searching for houses:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server error while retrieving houses",
      error: error.message,
    });
  }
};

module.exports = { getHouse, addHouse, deleteHouse, updateHouse, filter };
