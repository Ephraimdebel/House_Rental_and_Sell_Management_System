// const { query } = require("../../config/db");
const { StatusCodes } = require("http-status-codes");
const { BASE_URL } = require("../../config/index");


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

// const addHouse = async (req, res) => {
//   const { location, imgURL, price, details, ownerId } = req.body;

//   // Validate required fields
//   if (!location || !price || !details || !ownerId) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       message:
//         "All fields (location, imgURL, price, details, ownerId) are required",
//     });
//   }

//   try {
//     // Insert house details into the database
//     const result = await query(
//       "INSERT INTO House (location, price, details, ownerId) VALUES (?, ?, ?,  ?)",
//       [location, price, details, ownerId]
//     );

//     // Fetch the newly added house details
//     const houseResult = await query("SELECT * FROM House WHERE houseId = ?", [
//       result.insertId,
//     ]);

//     // Check if the house exists
//     if (!houseResult || houseResult.length === 0) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         message: "House was added but could not retrieve its details",
//       });
//     }

//     // Send the response with the house details
//     res.status(StatusCodes.CREATED).json({
//       ...houseResult[0],
//       message: "House added successfully",
//     });
//   } catch (error) {
//     console.error("Error while adding house:", error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       message: "Server error while adding house",
//       error: error.message,
//     });
//   }
// };


const dbConnection = require("../../config/db");


 const addHouse = async (req, res) => {
  console.log("step 1")
  try {
    const {
      category,
      type,
      streetAddress,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      title,
      description,
      price,
      longitude,
      latitude,
      videoUrl,
    } = req.body;

    const listingPhotos = req.files;

    // Check if files are uploaded
    if (!listingPhotos || listingPhotos.length === 0) {
      return res.status(400).json({ message: 'Please upload property photos' });
    }

    // Map photo paths to a valid URL
    const listingPhotoPaths = listingPhotos.map((file) => {
      const relativePath = file.path.replace(/\\/g, '/');
      return `${BASE_URL}/${relativePath}`;
    });

    const isAdmin = 1;

    const query = `
      INSERT INTO listings (creator_id, category_id, type_id, streetAddress, city, province, country, guestCount, bedroomCount, bedCount, bathroomCount, listingPhotoPaths, title, description, price, longitude, latitude, videoUrl, isAvailable)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      1, // Creator ID (hardcoded for testing)
      category,
      type,
      streetAddress,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      JSON.stringify(listingPhotoPaths),
      title,
      description,
      price,
      longitude,
      latitude,
      videoUrl || null,
      isAdmin ? 1 : 0,
    ];
    console.log("step 2")

    // Execute the insert query
    const result = await dbConnection.query(query, values);
    console.log("step 4",result)

    if (!req.user || !req.user.userid) {
      return res.status(400).json({ message: 'User not authenticated' });
    }
    console.log("step 5")

    const notificationQuery = `
      INSERT INTO notifications (user_id, message)
      VALUES (?, ?)
    `;
    const notificationValues = [
      req.user.userid,
      `Listing "${title}" created successfully`,
    ];

    await dbConnection.query(notificationQuery, notificationValues);

    res.status(200).json({
      message: 'Property created successfully',
      newListing: result,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error in creating listing', error: err.message });
  }
};








const getAllListings = async (req, res) => {
  console.log("Fetching all listings...");
  try {
    // Query to fetch all listings
    const query = `SELECT * FROM listings`;

    // Execute the query
    const results = await dbConnection.query(query);

    // Return the results
    res.status(200).json({
      message: "All listings retrieved successfully",
      data: results[0], // Use results[0] if using mysql2's promise API
    });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ message: "Error fetching listings", error: err.message });
  }
};



const getListingsByType = async (req, res) => {
  console.log("Fetching listings by type...", req.query);
  try {
    // Get the type_id from query parameters
    const { type_id } = req.query;

    // Check if type_id is provided
    if (!type_id) {
      return res.status(400).json({ message: "type_id is required" });
    }

    // Query to fetch listings by type_id
    const query = `SELECT * FROM listings WHERE type_id = ?`;

    // Execute the query with the provided type_id
    const results = await dbConnection.query(query, [type_id]);

    // Return the results
    res.status(200).json({
      message: `Listings with type_id ${type_id} retrieved successfully`,
      data: results[0], // Use results[0] for mysql2's promise API
    });
  } catch (err) {
    console.error("Error fetching listings by type:", err);
    res.status(500).json({ message: "Error fetching listings", error: err.message });
  }
};


const getHouseDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid or missing house ID" });
    }

    // Query to fetch house details by ID
    const sqlQuery = `
      SELECT * 
      FROM listings 
      WHERE id = ?
    `;

    const houseDetails = await dbConnection.query(sqlQuery, [id]);

    if (houseDetails.length === 0) {
      return res.status(404).json({ message: "House not found" });
    }

    res.status(200).json({
      message: "House details retrieved successfully",
      data: houseDetails[0], // Return the first result since ID is unique
    });
  } catch (error) {
    console.error("Error retrieving house details:", error.message);
    res.status(500).json({
      message: "An error occurred while retrieving house details",
      error: error.message,
    });
  }
}





module.exports = { getHouse, addHouse, getAllListings ,getHouseDetails,getListingsByType};
