import React from "react";
import "./HouseDetail.module.css"; // Rename and update your CSS file to match your React project structure

const HouseDetails = () => {
  return (
    <div className="house-details">
      <Description />
      <Specifications />
      <Features />
      <CommentSection />
      <VirtualTour />
      <LeaveComment />
      <PricingSection />
    </div>
  );
};

const Description = () => (
  <div className="description">
    <img
      src="./images/istockphoto-1026205392-612x612.jpg"
      alt="image of the house"
    />
    <p>
      The interior of the house is focused around a large central hallway
      serving as the main avenue of traffic and entrance area to the adjacent
      rooms. The hallway flows into a large, wide staircase that provides the
      main means of egress.
    </p>
    <p>
      On the south side of the hall is the large front parlor. This room
      contains original wallpaper including ceiling panels of small birds and
      orange flowers with vibrant leaves of green and yellow set upon a light
      blue background. The main body of the wallpaper is shades. Enjoy creating
      amazing websites. Impress your clients and your colleagues with the one
      completely versatile Listings WordPress Theme. All with one incredible
      theme by ModelTheme. Create the website you needed!
    </p>
  </div>
);

const Specifications = () => (
  <div className="specification">
    <h2>Specifications</h2>
    <div className="underline">
      <div></div>
    </div>
    <div className="specification-container">
      <div>
        <ul>
          <li>Construction year: 2016</li>
          <li>Bathrooms: 2</li>
          <li>Car Parking: 5</li>
          <li>Garages: 1</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Square Areas: 450</li>
          <li>Bedrooms: 3</li>
          <li>Total Floors: 25</li>
          <li>Pools: 2</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Living rooms: 2</li>
          <li>Balconies: 4</li>
          <li>Kitchens: 1</li>
          <li>Insurance: Yes</li>
        </ul>
      </div>
    </div>
  </div>
);

const Features = () => (
  <div className="features">
    <h2>Features</h2>
    <div className="underline">
      <div></div>
    </div>
    <div className="feature-column">
      {[
        [
          "Air Conditioning",
          "All Wheel Drive",
          "Audio Input",
          "Bluetooth",
          "Cancellation",
          "Cruise Control",
        ],
        [
          "DVD Video System",
          "FM Radio",
          "GPS Navigation",
          "Heated Seats",
          "Keyless Entry",
          "Leather Seats",
        ],
        [
          "Roadside Assistance",
          "Sunroof",
          "Theft Protection",
          "Third Row Seat",
          "Tow Hitch",
          "USB Input",
        ],
      ].map((column, index) => (
        <div key={index}>
          <ul>
            {column.map((feature, i) => (
              <li key={i}>
                <i className="bx bx-checkbox-checked"></i>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const CommentSection = () => (
  <div className="comment-section-1">
    <h2>Comments:</h2>
    <div className="underline">
      <div></div>
    </div>
    <div className="comment">
      <div className="comment-header">
        <img
          src="./images/images.png"
          alt="User profile"
          className="profile-pic"
        />
        <div>
          <span className="username">Cristian Stan</span>
          <span className="date">June 8, 2017 at 9:34 am</span>
        </div>
      </div>
      <h4 className="comment-title">Perfect Property</h4>
      <div className="rating">★★★★★</div>
      <p>
        Perfect! On the south side of the hall is the large front parlor. This
        room contains original wallpaper including ceiling panels of small birds
        and orange flowers with vibrant leaves of green and yellow set upon a
        light blue background.
      </p>
      <a href="#" className="reply-link">
        Reply
      </a>
    </div>
  </div>
);

const VirtualTour = () => (
  <div className="video">
    <h2>Virtual Tour</h2>
    <div className="underline">
      <div></div>
    </div>
    <div className="video-container">
      <iframe
        src="https://www.youtube.com/embed/tmWQpF16YOY?si=bK6ZeuM3wjaH9Z2K"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

const LeaveComment = () => (
  <div className="comment-section">
    <h2>Leave a Comment</h2>
    <div className="underline">
      <div></div>
    </div>
    <div className="review-container">
      <label htmlFor="review">Your Review</label>
      <textarea
        id="review"
        name="review"
        placeholder="Tell about your experience "
      ></textarea>
    </div>
    <div className="input-fields">
      <div className="input-field">
        <input type="text" id="name" name="name" placeholder="Your name" />
      </div>
      <div className="input-field">
        <input type="email" id="email" name="email" placeholder="Your email" />
      </div>
      <div className="input-field">
        <input
          type="url"
          id="website"
          name="website"
          placeholder="Your website"
        />
      </div>
    </div>
    <h3>Your overall rating of this listing:</h3>
    <div className="rating-container">
      {[5, 4, 3, 2, 1].map((star) => (
        <React.Fragment key={star}>
          <input
            type="radio"
            id={`star${star}`}
            name="rating"
            value={star}
            title={"Exceptional"}
          />
          <label htmlFor={`star${star}`} title="5 stars">
            &#9733;
          </label>
        </React.Fragment>
      ))}
    </div>
    <div>
      <button type="submit" className="submit-btn">
        Add Comment
      </button>
    </div>
  </div>
);

const PricingSection = () => (
  <div className="pricing-section">
    <div className="price-container">
      <div className="price-per-day">
        <span>$120</span>
        <span> Per Day</span>
      </div>
      <div className="price-per-month">
        <span>$899</span>
        <span> Per Month</span>
      </div>
    </div>
    <form>
      <input type="text" placeholder="Full Name" required />
      <input type="email" placeholder="Email Address" required />
      <input type="tel" placeholder="Phone Number" required />
      <input type="date" placeholder="Start Date" required />
      <input type="date" placeholder="End Date" required />
      <button type="submit" className="submit-btn">
        Instant Booking
      </button>
    </form>
  </div>
);

export default HouseDetails;
