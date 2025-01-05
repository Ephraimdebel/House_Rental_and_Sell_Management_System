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
            <a href="/sale" className="link">
              Sale
            </a>
          </li>
          <li className="menu-item">
            <a href="/rentals" className="link">
              Rentals
            </a>
          </li>
          <li className="menu-item">
            <a href="/about" className="link">
              About Us
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
            <a href="/logout" className="link">
              Logout
            </a>
          </li>
          <li className="menu-item">
            <a href="/user" className="link">
              Profile
            </a>
          </li>
          <li className="menu-item search-area">
            <input
              type="text"
              placeholder="Search area..."
              className="search-input"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
