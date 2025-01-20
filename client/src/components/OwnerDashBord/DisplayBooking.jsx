import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DisplayBooking.module.css";

const DisplayBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track errors
  const token = localStorage.getItem("token"); // Ensure the token is being retrieved

  const fetchBookings = async () => {
    if (!token) {
      setError("No token found in localStorage");
      setLoading(false);
      return;
    }

    try {
      // Fetch bookings from the backend API
      const response = await axios.get("http://localhost:5500/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched Bookings:", response.data); // Log to see the response
      if (response.data && response.data.data) {
        console.log("setting books data");
        setBookings(response.data.data); // Set bookings data
      } else {
        setBookings([]); // Handle case where no data is returned
      }
      setLoading(false); // Stop loading after data is fetched
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Error fetching data. Please try again."); // Set error state
      setLoading(false); // Stop loading in case of error
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle status change for a booking
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("token"); // Ensure token is retrieved

      // Update the status of the booking
      const response = await axios.put(
        `http://localhost:5500/api/booking/${bookingId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Successfully updated status in the backend, now update the state
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.booking_id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
      } else {
        console.error(
          "Failed to update status, status code:",
          response?.status
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Render error if any exists
  if (error) {
    return <h1>{error}</h1>;
  }

  // Render loading message while the data is being fetched
  if (loading) {
    return <h1>Loading bookings...</h1>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>All Bookings</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the bookings and display them */}
          {Array.isArray(bookings) &&
            bookings?.map((booking) => (
              <tr key={booking.booking_id}>
                <td>{booking.booking_id}</td>
                <td>{booking.customer_name}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                <td>{booking.totalPrice}</td>
                <td>{booking.status}</td>
                <td>
                  {/* Dropdown to change the booking status */}
                  <select
                    className={styles.statusSelect}
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking.booking_id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayBooking;
