import React from "react";
import classes from "./AboutUs.module.css"; // Importing the CSS file for styling
import about_image from "../../assets/AboutImg/about_image.jpg";
import image from "../../assets/AboutImg/image.jpg";
import alpha from "../../assets/AboutImg/alpha.jpeg";
import ephraim from "../../assets/AboutImg/ephraim.jpg";
import jiru from "../../assets/AboutImg/jiru.jpeg";

const AboutUs = () => {
  return (
    <div className={classes["about-us-container"]}>
      {/* Hero Section */}
      <section className={classes["hero-section"]}>
        <h1>About Us</h1>
        <p>
          Welcome to Our Company! We're committed to providing the best services
          to help you find your dream home. 
        </p>
      </section>

      {/* Mission Section */}
      <section className={classes["mission-section"]}>
        <div className={classes["mission-content"]}>
          {/* Top Section: Image on the Left, Text on the Right */}
          <div
            className={`${classes["mission-item"]} ${classes["top-section"]}`}
          >
            <div className={classes["mission-image-left"]}>
              <img
                src={about_image}
                alt="Mission Image Left"
                className={classes["mission-img-left"]}
              />
            </div>
            <div className={classes["mission-text-right"]}>
              <p>
                At Our Company, we believe in delivering personalized services
                to help clients find the perfect home that matches their
                lifestyle. At Our Company, we believe in delivering personalized
                services to help clients find the perfect home that matches
                their lifestyle.
              </p>
            </div>
          </div>

          {/* Bottom Section: Text on the Left, Image on the Right */}
          <div
            className={`${classes["mission-item"]} ${classes["bottom-section"]}`}
          >
            <div className={classes["mission-image-right"]}>
              <img
                src={image}
                alt="Mission Image Right"
                className={classes["mission-img-right"]}
              />
            </div>
            <div className={classes["mission-text-left"]}>
              <p>
                Our team of experts is here to guide you every step of the way,
                from finding your dream home to securing the best deals in the
                market. Our team of experts is here to guide you every step of
                the way, from finding your dream home to securing the best deals
                in the market. Our team of experts is here to guide you every
                step of the way, from finding your dream home to securing the
                best deals in the market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={classes["team-section"]}>
        <h2>Meet Our Team</h2>
        <div className={classes["team-members"]}>
          <div className={classes["team-member-card"]}>
            <img
              src={alpha}
              alt="Alpha Degago"
              className={classes["team-member-image"]}
            />
            <h3>Alpha Degago</h3>
            <p>CEO & Founder</p>
          </div>
          <div className={classes["team-member-card"]}>
            <img
              src={ephraim}
              alt="Ephraim Debel"
              className={classes["team-member-image"]}
            />
            <h3>Ephraim Debel</h3>
            <p>Chief Marketing Officer</p>
          </div>
          <div className={classes["team-member-card"]}>
            <img
              src={jiru}
              alt="Jiru Gutema"
              className={classes["team-member-image"]}
            />
            <h3>Jiru Gutema</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={classes["contact-section"]}>
        <h2>Contact Us</h2>
        <p>
          We’d love to hear from you! Reach out to us with any questions or
          feedback.
        </p>
        <p>Email: support@ourcompany.com | Phone: +1 (123) 456-7890</p>
      </section>
    </div>
  );
};

export default AboutUs;
