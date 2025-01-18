import React, { useState } from "react";
import "./header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">G-5 Houses</div>
        <button
          className="menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <ul className={`menu-items ${isMenuOpen ? "menu-open" : ""}`}>
          <li className="menu-item">
            <a href="/" className="link">
              Home
            </a>
          </li>
          <li className="menu-item">
            <a href="/listingSale" className="link">
              Sale
            </a>
          </li>
          <li className="menu-item">
            <a href="listingRent" className="link">
              Rentals
            </a>
          </li>
          <li className="menu-item">
            <a href="/contact" className="link">
              Contact Us
            </a>
          </li>
          <li className="menu-item">
            <a href="/login" className="link">
              Login
            </a>
          </li>
          <li className="menu-item">
            <a href="/user" className="link">
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
