import React, { useState } from "react";
import styles from "./HostProfile.module.css"; // Importing the CSS Module

// Comment Section Component
const CommentSection1 = () => (
  <div className={styles.commentSection1}>
    <h2>Comments: </h2>
    <div className={styles.underline}>
      <div></div>
    </div>
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <img
          src="./images/images.png"
          alt="User profile"
          className={styles.profilePic}
        />
        <div>
          <span className={styles.username}>Cristian Stan</span>
          <span className={styles.date}>June 8, 2017 at 9:34 am</span>
        </div>
      </div>
      <h4 className={styles.commentTitle}>Perfect Property</h4>
      <div className={styles.rating}>★★★★★</div>
      <p>
        Perfect! On the south side of the hall is the large front parlor. This
        room contains original wallpaper including ceiling panels of small birds
        and orange flowers with vibrant leaves of green and yellow set upon a
        light blue background.
      </p>
      <a href="#" className={styles.replyLink}>
        Reply
      </a>
    </div>
  </div>
);

// Video Section Component
const VideoSection = () => (
  <div className={styles.video}>
    <div>
      <h2>Virtual Tour</h2>
      <div className={styles.underline}>
        <div></div>
      </div>
    </div>
    <div className={styles.videoContainer}>
      <iframe
        src="https://www.youtube.com/embed/tmWQpF16YOY?si=bK6ZeuM3wjaH9Z2K"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

// Leave Comment Section Component
const LeaveComment = () => {
  const [formData, setFormData] = useState({
    review: "",
    name: "",
    email: "",
    website: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles.commentSection}>
      <div>
        <h2>Leave a Comment</h2>
        <div className={styles.underline}>
          <div></div>
        </div>
      </div>

      <div className={styles.reviewContainer}>
        <label htmlFor="review">Your Review</label>
        <textarea
          id="review"
          name="review"
          value={formData.review}
          onChange={handleChange}
          placeholder="Tell about your experience"
        ></textarea>
      </div>

      <div className={styles.inputFields}>
        <div className={styles.inputField}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputField}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputField}>
          <input
            type="url"
            id="website"
            name="website"
            placeholder="Your website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
      </div>

      <h3>Your overall rating of this listing:</h3>
      <div className={styles.ratingContainer}>
        <div className={styles.rating}>
          <input
            type="radio"
            id="star5"
            name="rating"
            value="5"
            title="Exceptional"
            onChange={handleChange}
          />
          <label htmlFor="star5" title="5 stars">
            &#9733;
          </label>

          <input
            type="radio"
            id="star4"
            name="rating"
            value="4"
            title="Very Good"
            onChange={handleChange}
          />
          <label htmlFor="star4" title="4 stars">
            &#9733;
          </label>

          <input
            type="radio"
            id="star3"
            name="rating"
            value="3"
            title="Average"
            onChange={handleChange}
          />
          <label htmlFor="star3" title="3 stars">
            &#9733;
          </label>

          <input
            type="radio"
            id="star2"
            name="rating"
            value="2"
            title="Poor"
            onChange={handleChange}
          />
          <label htmlFor="star2" title="2 stars">
            &#9733;
          </label>

          <input
            type="radio"
            id="star1"
            name="rating"
            value="1"
            title="Terrible"
            onChange={handleChange}
          />
          <label htmlFor="star1" title="1 star">
            &#9733;
          </label>
        </div>
        <div className={styles.ratingTitle}>Select a rating</div>
      </div>
      <div>
        <button
          type="submit"
          className={styles.submitBtn}
          onClick={handleSubmit}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

// Main Component that combines all sections
const HostProfile = () => (
  <div className={styles.hostProfile}>
    <CommentSection1 />
    <VideoSection />
    <LeaveComment />
  </div>
);

export default HostProfile;
