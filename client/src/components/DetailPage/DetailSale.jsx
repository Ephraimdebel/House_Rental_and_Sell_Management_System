import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import BookingCard from "../Booking/BookingCard";

function DetailSale() {
  const { id } = useParams();
  const [houseData, setHouseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the house details
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5500/api/house/${id}`);
        const data = await response.json();
        setHouseData(data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching house data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!houseData) {
    return <p>House data not found.</p>;
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.flexContainer}>
        {/* Main Image */}
        <div className={styles.mainImageContainer}>
          <img
            src={houseData.listingPhotoPaths[0]}
            alt={houseData.title}
            className={styles.mainImage}
          />
        </div>

        {/* Gallery */}
        <div className={styles.gallery}>
          {houseData.listingPhotoPaths.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Gallery ${index + 1}`}
              className={styles.thumbnail}
            />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className={styles.infoContainer}>
        <div>
          <h2>{houseData.title}</h2>
          <p className={styles.location}>
            📍 {houseData.streetAddress}, {houseData.city}, {houseData.country}
          </p>
        </div>
        <p className={styles.price}>${houseData.price} </p>
      </div>

      {/* Description Section */}
      <div className={styles.descriptionReservation}>
        <div className={styles.AboutBook}>
          <div className={styles.descriptionContainer}>
            <h3>About this house</h3>
            <p className={styles.houseDescription}>{houseData.description}</p>
          </div>
        </div>

        {/* Booking Section */}
        <div className={styles.bookingSection}>
          <BookingCard hostId={houseData.creator_id} listingId={houseData.id} />
        </div>
      </div>
    </div>
  );
}

export default DetailSale;
