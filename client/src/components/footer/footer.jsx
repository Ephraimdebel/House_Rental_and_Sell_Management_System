import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-list">
            <li className="footer-list-item">
              <a href="/" className="footer-link">
                Home
              </a>
            </li>
            <li className="footer-list-item">
              <a href="/sale" className="footer-link">
                Properties for Sale
              </a>
            </li>
            <li className="footer-list-item">
              <a href="/rentals" className="footer-link">
                Rentals
              </a>
            </li>
            <li className="footer-list-item">
              <a href="/about" className="footer-link">
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-list">
            <li className="footer-list-item">123 Real Estate St.</li>
            <li className="footer-list-item">Cityville, State 12345</li>
            <li className="footer-list-item">Phone: (123) 456-7890</li>
            <li className="footer-list-item">Email: info@realestate.com</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <ul className="footer-list">
            <li className="footer-list-item">
              <a href="#" className="footer-link">
                Facebook
              </a>
            </li>
            <li className="footer-list-item">
              <a href="#" className="footer-link">
                Twitter
              </a>
            </li>
            <li className="footer-list-item">
              <a href="#" className="footer-link">
                Instagram
              </a>
            </li>
            <li className="footer-list-item">
              <a href="#" className="footer-link">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        © 2023 Real Estate Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
