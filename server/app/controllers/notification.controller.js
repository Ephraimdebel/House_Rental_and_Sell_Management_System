const dbConnection = require("../../config/db");

const getNotifications = async (req, res) => {
    try {
      const { userid } = req.user; // Assuming req.user contains the authenticated user's information
  
      if (!userid) {
        return res.status(400).json({ message: "User ID is missing" });
      }
  
      // Query to fetch notifications for the user
      const query = `
        SELECT 
          id,
          message,
          is_read,
          created_at
        FROM Notifications
        WHERE user_id = ?
        ORDER BY created_at DESC
      `;
  
      // Execute the query
      const [notifications] = await dbConnection.query(query, [userid]);
  
      // Return the notifications
      res.status(200).json({
        message: "Notifications retrieved successfully",
        data: notifications,
      });
    } catch (err) {
      console.error("Error fetching notifications:", err);
      res.status(500).json({ message: "Error fetching notifications", error: err.message });
    }
  };
  

module.exports = { getNotifications };