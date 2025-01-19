import React, { useState } from "react";
import axios from "../../Api/axios";
import classes from "./BokingCard.module.css"; // Optional styling

function BookingCard({ hostId, listingId }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    try {
      if (!startDate || !endDate) {
        setMessage("Please select both start and end dates.");
        return;
      }

      const response = await axios.post(
        `booking/${hostId}/${listingId}`, // Adjust the endpoint URL
        {
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token for authentication
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Failed to create booking.");
    }
  };

  return (
    <div className={classes.bookingCard}>
      <h3>Book This Listing</h3>

      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={handleBooking} className={classes.bookingButton}>
        Request To Buy
      </button>

      {message && <p className={classes.bookingMessage}>{message}</p>}
    </div>
  );
}

export default BookingCard;
