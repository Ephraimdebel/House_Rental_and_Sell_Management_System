import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import BookingCard from "../Booking/BookingCard";
import ReactPlayer from "react-player";
import Rating from "@mui/material/Rating"

function Detail() {
  const { id } = useParams();
  const [houseData, setHouseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialForm, setTestimonialForm] = useState({
    userName: "",
    rating: 5,
    review_text: "",
  });

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

    // Fetch testimonials
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`http://localhost:5500/api/feedback/reviews/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` // Corrected: Move this inside headers
            }
        });
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchData();
    fetchTestimonials();
  }, [id]);
console.log("testimonials:",testimonials)
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setTestimonialForm({ ...testimonialForm, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5500/api/feedback/reviews/${id}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` // Corrected: Move this inside headers
        },
        body: JSON.stringify(testimonialForm),
      });
      if (response.ok) {
        // const newTestimonial = await response.json();
        // setTestimonials((prev) => [...prev, newTestimonial]);
        setTestimonialForm({ userName: "", rating: 5, review_text: "" }); // Reset form
      } else {
        console.log("Failed to submit testimonial:", response.status);
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (!houseData) return <p>House not found</p>;

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
        <p className={styles.price}>${houseData.price} / night</p>
      </div>

      {/* Description Section */}
      <div className={styles.descriptionReservation}>
        <div className={styles.descriptionContainer}>
          <h3>About this house</h3>
          <p className={styles.houseDescription}>{houseData.description}</p>
        </div>
      </div>

      {/* Booking Section */}
      <div className={styles.bookingSection}>
        <BookingCard hostId={houseData.creator_id} listingId={houseData.id} />
      </div>

      {/* YouTube Video Section */}
      <div className={styles.videoSection}>
        <h3>Take a Tour</h3>
        <ReactPlayer url={houseData.videoUrl} width="67%" height="515px" controls={true} />
      </div>

      {/* Testimonial Section */}
      <div className={styles.testimonialSection}>
        <h3>Testimonials</h3>
        {testimonials?.length > 0 ? (
          testimonials?.map((testimonial, index) => (
            <div key={index} className={styles.testimonial}>
              <p>
                <strong>{testimonial.reviewerName}</strong>
                <div className={styles.rating}>
                <Rating value = {testimonial?.rate} precision = {0.1} />
                <small>{testimonial?.count}</small>
            </div> 
              </p>
              <p>{testimonial?.message}</p>
            </div>
          ))
        ) : (
          <p>No testimonials yet. Be the first to leave one!</p>
        )}

<form onSubmit={handleFormSubmit} className={styles.testimonialForm}>
  <h4>Leave a Testimonial</h4>
  
  {/* Name Field */}
  <label htmlFor="userName">Your Name:</label>
  <input
    id="userName"
    type="text"
    name="userName"
    value={testimonialForm.userName}
    placeholder="Enter your name"
    onChange={handleFormChange}
    required
  />

  {/* Rating Field */}
  <label htmlFor="rating">Rating:</label>
  <select
    id="rating"
    name="rating"
    value={testimonialForm.rating}
    onChange={handleFormChange}
    required
  >
    {[1, 2, 3, 4, 5].map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
  </select>

  {/* Message Field */}
  <label htmlFor="message">Your Testimonial:</label>
  <textarea
    id="message"
    name="review_text"
    value={testimonialForm.review_text}
    placeholder="Write your testimonial here"
    onChange={handleFormChange}
    required
  />

  {/* Submit Button */}
  <button type="submit">Submit</button>
</form>
      </div>
    </div>
  );
}

export default Detail;
