import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DisplayBooking.module.css";

const DisplayBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
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
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.booking_id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
      } else {
        console.error("Failed to update status, status code:", response.status);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
          {bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.customer_name}</td>
              <td>{new Date(booking.startDate).toLocaleDateString()}</td>
              <td>{new Date(booking.endDate).toLocaleDateString()}</td>
              <td>{booking.totalPrice}</td>
              <td>{booking.status}</td>
              <td>
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
