// const { query } = require("../../config/db");
const { StatusCodes } = require("http-status-codes");
const { BASE_URL } = require("../../config/index");



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
      videoUrl,
    } = req.body;

    const photos = req.files;
    const listingPhotos = photos;

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
      req.user.userid, // Creator ID (hardcoded for testing)
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
       98.7,
       98.7,
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
    console.error('Error in creating listing:', err);
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
  console.log("Fetching listings by type with pagination...", req.query);

  try {
    // Get the type_id, page, and limit from query parameters
    const { type_id, page = 1, limit = 6 } = req.query;

    // Check if type_id is provided
    if (!type_id) {
      return res.status(400).json({ message: "type_id is required" });
    }

    // Calculate the offset based on page and limit
    const offset = (page - 1) * limit;

    // Query to fetch listings by type_id with pagination (limit and offset)
    const query = `SELECT * FROM listings WHERE type_id = ? LIMIT ? OFFSET ?`;

    // Execute the query with the provided type_id, limit, and offset
    const results = await dbConnection.query(query, [type_id, Number(limit), Number(offset)]);

    // Query to count total number of listings for the given type_id (for pagination purposes)
    const countQuery = `SELECT COUNT(*) AS total FROM listings WHERE type_id = ?`;
    const totalResults = await dbConnection.query(countQuery, [type_id]);

    const totalRecords = totalResults[0][0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // Return the paginated results
    res.status(200).json({
      message: `Listings with type_id ${type_id} retrieved successfully`,
      data: results[0], // Use results[0] for mysql2's promise API
      currentPage: Number(page),
      totalPages: totalPages,
      totalRecords: totalRecords,
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



const getFilteredHouses = async (req, res) => {
  try {
    // Extract query parameters
    const { category, city, bathrooms, type, minPrice, maxPrice } = req.query;

    console.log('Received filters:', req.query); // Debug incoming query parameters

    // Base query
    let query = `SELECT * FROM listings WHERE 1=1`;
    const queryParams = [];

    // Dynamically add filters
    if (category) {
      query += ` AND category_id = ?`;
      queryParams.push(category);
    }

    if (city) {
      query += ` AND LOWER(city) = LOWER(?)`; // Case-insensitive comparison
      queryParams.push(city.trim()); // Trim spaces from input
    }

    if (bathrooms) {
      query += ` AND bathroomCount >= ?`;
      queryParams.push(bathrooms);
    }

    if (type) {
      query += ` AND type_id = ?`;
      queryParams.push(type);
    }

    if (minPrice && maxPrice) {
      query += ` AND price BETWEEN ? AND ?`;
      queryParams.push(minPrice, maxPrice);
    } else if (minPrice) {
      query += ` AND price >= ?`;
      queryParams.push(minPrice);
    } else if (maxPrice) {
      query += ` AND price <= ?`;
      queryParams.push(maxPrice);
    }

    console.log('Generated Query:', query); // Debug the SQL query
    console.log('Query Parameters:', queryParams); // Debug query parameters

    // Execute query
    const [filteredHouses] = await dbConnection.query(query, queryParams);

    res.status(200).json({
      message: 'Filtered houses retrieved successfully',
      houses: filteredHouses,
    });
  } catch (error) {
    console.error('Error fetching filtered houses:', error.message);
    res.status(500).json({
      message: 'Error fetching filtered houses',
      error: error.message,
    });
  }
};



module.exports = { addHouse, getAllListings ,getHouseDetails,getListingsByType,getFilteredHouses};
