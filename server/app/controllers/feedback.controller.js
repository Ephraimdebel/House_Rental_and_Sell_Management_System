const dbConnection = require("../../config/db");


const createReview = async (req, res) => {
    try {
      const { propertyId } = req.params; // Get the propertyId from the URL
      const { rating, review_text } = req.body; // Get rating and review text from the request body
      const reviewer_id = req.user.userid; // Get the reviewer ID from the authenticated user
  
      // Check if the rating is within the valid range (1-5)
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
      }
  
      // Insert the new review into the database
      const insertReviewQuery = `
        INSERT INTO Reviews (reviewer_id, property_id, rating, review_text)
        VALUES (?, ?, ?, ?)
      `;
  
      const reviewValues = [reviewer_id, propertyId, rating, review_text];
  
      const [result] = await dbConnection.query(insertReviewQuery, reviewValues);
  
      // Send a success response
      res.status(201).json({
        message: "Review created successfully!",
        review: {
          id: result.insertId,
          reviewer_id,
          property_id: propertyId,
          rating,
          review_text,
          createdAt: new Date(), // You could also get the exact created date from the database
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create review", error: err.message });
    }
  }


  const getReviews = async (req, res) => {
    try {
      const { id: property_id } = req.params;
  
      // Query to fetch reviews and reviewer names
      const query = `
       SELECT 
  Reviews.id,
  Reviews.rating,
  Reviews.review_text AS message,
  Reviews.createdAt,
  Users.userName AS reviewerName
FROM Reviews
INNER JOIN Users ON Reviews.reviewer_id = Users.id
WHERE Reviews.property_id = ?
ORDER BY Reviews.createdAt DESC;

      `;
  
      // Execute the query
      const [reviews] = await dbConnection.query(query, [property_id]);
  
      if (reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found for this property." });
      }
  
      // Respond with the reviews
      res.json({ testimonials: reviews });
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
      res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
    }
  };
  
  

  module.exports = { createReview,getReviews };