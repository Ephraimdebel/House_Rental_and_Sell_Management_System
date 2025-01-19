import React, { useState } from "react";
import classes from "./header.module.css"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.logo}>Infinity Houses</div>
        <button
          className={classes["menu-icon"]}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <ul
          className={`${classes["menu-items"]} ${
            isMenuOpen ? classes["menu-open"] : ""
          }`}
        >
          <li className={classes["menu-item"]}>
            <a href="/" className={classes.link}>
              Home
            </a>
          </li>
          <li className={classes["menu-item"]}>
            <a href="/listingSale" className={classes.link}>
              Sale
            </a>
          </li>
          <li className={classes["menu-item"]}>
            <a href="/listingRent" className={classes.link}>
              Rentals
            </a>
          </li>
          <li className={classes["menu-item"]}>
            <a href="/about" className={classes.link}>
              About Us
            </a>
          </li>
          <li className={classes["menu-item"]}>
            <a href="/contact" className={classes.link}>
              Contact Us
            </a>
          </li>
          <li className={classes["menu-item"]}>
            <a href="/login" className={classes.link}>
              Login
            </a>
          </li>
          <li className={classes["menu-item"]}>
            <a href="/user" className={classes.link}>
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
