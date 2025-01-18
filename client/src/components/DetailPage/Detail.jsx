import React, { useState } from "react";
import styles from "./Detail.module.css";

// Import icons from React Icons
import { FaWifi } from "react-icons/fa";
import { LuCircleParking } from "react-icons/lu";
import { FaTv } from "react-icons/fa";

// Example image imports
import DetailPageImg1 from "../../assets/DetailPageImg/DetailPageImg1.jpg";
import DetailPageImg2 from "../../assets/DetailPageImg/DetailPageImg2.jpg";
import DetailPageImg3 from "../../assets/DetailPageImg/DetailPageImg3.jpg";
import DetailPageImg4 from "../../assets/DetailPageImg/DetailPageImg4.jpg";
import DetailPageImg5 from "../../assets/DetailPageImg/DetailPageImg5.jpg";

function Detail() {
  const [guests, setGuests] = useState(1); // For managing the guests selection

  const handleGuestChange = (event) => {
    setGuests(event.target.value);
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.flexContainer}>
        {/* Main Image Section */}
        <div className={styles.mainImageContainer}>
          <img
            src={DetailPageImg1}
            alt="Luxurious 4-Bedroom Villa"
            className={styles.mainImage}
          />
        </div>

        {/* Gallery Section */}
        <div className={styles.gallery}>
          <img
            src={DetailPageImg2}
            alt="Bedroom"
            className={styles.thumbnail}
          />
          <img
            src={DetailPageImg3}
            alt="Living Room"
            className={styles.thumbnail}
          />
          <img
            src={DetailPageImg4}
            alt="Kitchen"
            className={styles.thumbnail}
          />
          <img
            src={DetailPageImg5}
            alt="Modern House"
            className={styles.thumbnail}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className={styles.infoContainer}>
        <div>
          <h2>Luxurious 4-Bedroom Villa</h2>
          <p className={styles.location}>📍 Birchwood, USA</p>
        </div>
        <p className={styles.price}>250 $/night</p>
      </div>

      <div className={styles.descriptionReservation}>
        <div className={styles.descriptionContainer}>
          <h3>About this house</h3>
          <p className={styles.houseDescription}>
            This modern 4-bedroom villa is perfect for families and small
            groups, offering plenty of space and comfort. Located in the heart
            of Birchwood, the villa is a short distance away from local shops,
            restaurants, and entertainment options. Enjoy breathtaking views of
            the city from the large windows and relax in the spacious living
            room. The house is fully equipped with modern appliances, including
            a flat-screen TV, Wi-Fi, and a fully stocked kitchen, making it
            ideal for both short and long stays.
          </p>
          <p className={styles.houseDescription}>
            The villa features two full bathrooms, and each bedroom comes with
            plush bedding and plenty of closet space. Outside, you'll find a
            private patio where you can enjoy your morning coffee or dine al
            fresco. The home is child-friendly and equipped with safety features
            to ensure peace of mind for families with young children.
          </p>
        </div>

        {/* Booking Section - beside the "About this house" */}
        <div className={styles.bookingSection}>
          <div className={styles.bookingInfo}>
            <p className={styles.nightPrice}>$25 night</p>
            <div className={styles.date}>
              <p className={styles.date}>Check-in: 1/19/2025</p>
              <p className={styles.date}>Check-out: 1/24/2025</p>
            </div>
            {/* Guests dropdown */}
            <div className={styles.guestContainer}>
              <label htmlFor="guests" className={styles.guestLabel}>
                Guests:{" "}
              </label>
              <select
                id="guests"
                value={guests}
                onChange={handleGuestChange}
                className={styles.guestDropdown}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((guestCount) => (
                  <option key={guestCount} value={guestCount}>
                    {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className={styles.reserveButton}>Reserve</button>
          <div className={styles.bookingDetails}>
            <div className={styles.bookingPrice}>
              <p className={styles.bookingSummary}>$25 x 5 nights</p>
              <p className={styles.bookingAmount}>$125</p>
            </div>
            <div className={styles.RentalFee}>
              <p className={styles.bookingSummary}>Service fee</p>
              <p className={styles.bookingAmount}>$18</p>
            </div>
            <div className={styles.totalBeforeTax}>
              <p className={styles.total}>Total before taxes: </p>
              <p className={styles.Price}>$143</p>
            </div>
          </div>
        </div>
      </div>

      {/* What this place offers Section */}
      <div className={styles.amenitiesContainer}>
        <h3>What this place offers</h3>
        <div className={styles.amenitiesList}>
          <div className={styles.amenity}>
            <FaWifi className={styles.amenityIcon} />
            <p>Wifi</p>
          </div>
          <div className={styles.amenity}>
            <FaTv className={styles.amenityIcon} />
            <p>TV</p>
          </div>
          <div className={styles.amenity}>
            <LuCircleParking className={styles.amenityIcon} />
            <p>Free Parking</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
