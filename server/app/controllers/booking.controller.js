const dbConnection = require("../../config/db");

const createBooking = async (req, res) => {
  try {
    const { host_id, listing_id } = req.params;
    const { startDate, endDate } = req.body;
    const customer_id = req.user.userid;
console.log(host_id ,listing_id)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(startDate) < today) {
      return res
        .status(400)
        .json({ message: "Start date cannot be in the past" });
    }

    // Check if the listing exists
    const listingQuery = "SELECT * FROM Listings WHERE id = ?";
    const [listing] = await dbConnection.query(listingQuery, [listing_id]);

    if (!listing || listing.length === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const pricePerNight = listing[0].price;
    const durationMs = new Date(endDate) - new Date(startDate);
    const durationDays = durationMs / (1000 * 60 * 60 * 24);
    const totalPrice = pricePerNight * durationDays;

    // Check for overlapping bookings
    const overlappingQuery = `
      SELECT * FROM Bookings 
      WHERE listing_id = ? AND 
      (startDate < ? AND endDate > ?) AND
      status IN ('accepted', 'confirmed')
    `;
    const [overlappingBookings] = await dbConnection.query(overlappingQuery, [
      listing_id,
      endDate,
      startDate,
    ]);

    if (overlappingBookings.length > 0) {
      return res.status(400).json({
        message: "Overlapping booking with accepted or confirmed status",
      });
    }

    // Create the new booking
    const insertBookingQuery = `
      INSERT INTO Bookings (customer_id, host_id, listing_id, startDate, endDate, totalPrice, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `;
    const bookingValues = [
      customer_id,
      host_id,
      listing_id,
      startDate,
      endDate,
      totalPrice,
    ];
    const [bookingResult] = await dbConnection.query(
      insertBookingQuery,
      bookingValues
    );
    const newBookingId = bookingResult.insertId;

    // Create notifications
    const userNotificationQuery = `
      INSERT INTO Notifications (user_id, message)
      VALUES (?, ?)
    `;
    await dbConnection.query(userNotificationQuery, [
      customer_id,
      `Booking created successfully for listing ${listing[0].title}`,
    ]);

    const hostNotificationQuery = `
      INSERT INTO Notifications (user_id, message)
      VALUES (?, ?)
    `;
    await dbConnection.query(hostNotificationQuery, [
      host_id,
      `New booking received for listing ${listing[0].title}`,
    ]);

    res.json({
      message: `Booking created successfully for listing ${listing[0].title}`,
      booking: {
        id: newBookingId,
        customer_id,
        host_id,
        listing_id,
        startDate,
        endDate,
        totalPrice,
        status: "pending",
      },
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create booking", error: err.message });
  }
};


const updateBookingStatus = async (req, res) => {
    try {
        const { booking_id } = req.params; // Booking ID from URL params
        const { status } = req.body; // Status from request body

        // Validate status
        const validStatuses = ["pending", "accepted", "confirmed", "rejected", "canceled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Update booking status in the database
        const updateQuery = `
            UPDATE Bookings 
            SET status = ? 
            WHERE id = ?
        `;
        const [result] = await dbConnection.query(updateQuery, [status, booking_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
            message: `Booking status updated to '${status}' successfully`,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to update booking status", error: err.message });
    }
};

const getHostBookings = async (req, res) => {
  try {
    const hostId = req.user.userid; // Assuming req.user contains the logged-in host's ID

    if (!hostId) {
      return res.status(400).json({ message: "Host ID is required" });
    }

    // Query to fetch bookings for the host
    const query = `
      SELECT 
        b.id AS booking_id,
        u.userName AS customer_name,
        l.title AS listing_title,
        b.startDate,
        b.endDate,
        b.totalPrice,
        b.status
      FROM Bookings b
      JOIN Users u ON b.customer_id = u.id
      JOIN Listings l ON b.listing_id = l.id
      WHERE b.host_id = ?
      ORDER BY b.createdAt DESC
    `;

    // Execute the query
    const [bookings] = await dbConnection.query(query, [hostId]);

    // Return the bookings
    res.status(200).json({
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};


module.exports = {
  createBooking,updateBookingStatus,getHostBookings
};
