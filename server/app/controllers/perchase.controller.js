const dbConnection = require("../../config/db");
const crypto = require("crypto"); // For generating unique transaction references

const createPurchase = async (req, res) => {
  try {
    const { listing_id } = req.params; // Listing ID from URL params
    const { amount, payment_gateway = "Chapa" } = req.body; // Amount and payment gateway from body
    const buyer_id = req.user.userid; // Get buyer ID from authenticated user

    // Generate a unique transaction reference
    const transaction_reference = crypto.randomBytes(16).toString("hex");

    // Validate the listing exists
    const listingQuery = "SELECT * FROM Listings WHERE id = ?";
    const [listing] = await dbConnection.query(listingQuery, [listing_id]);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Validate the amount matches the listing price
    if (amount !== listing.price) {
      return res
        .status(400)
        .json({ message: "Amount does not match the listing price" });
    }

    // Insert purchase record into the database
    const purchaseQuery = `
      INSERT INTO Purchases (buyer_id, listing_id, amount, status, payment_status, transaction_reference, payment_gateway)
      VALUES (?, ?, ?, 'pending', 'pending', ?, ?)
    `;
    const purchaseValues = [
      buyer_id,
      listing_id,
      amount,
      transaction_reference,
      payment_gateway,
    ];

    const [purchaseResult] = await dbConnection.query(
      purchaseQuery,
      purchaseValues
    );

    const purchaseId = purchaseResult.insertId;

    // Respond with success message and purchase details
    res.status(201).json({
      message: "Purchase initiated successfully",
      purchase: {
        id: purchaseId,
        buyer_id,
        listing_id,
        amount,
        status: "pending",
        payment_status: "pending",
        transaction_reference,
        payment_gateway,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create purchase", error: err.message });
  }
};

module.exports = {
  createPurchase,
};
