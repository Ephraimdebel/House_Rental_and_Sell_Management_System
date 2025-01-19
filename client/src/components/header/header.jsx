import React, { useContext, useState } from "react";
import classes from "./header.module.css";
import { AppState } from "../../App";
import { Link } from "react-router-dom";
import { MdCircleNotifications } from "react-icons/md";
import { messageLength } from "../notification/notification";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const { handleLogout, user } = useContext(AppState);

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
            <Link to="/" className={classes.link}>
              Home
            </Link>
          </li>
          <li className={classes["menu-item"]}>
            <Link to="/listingSale" className={classes.link}>
              Sale
            </Link>
          </li>
          <li className={classes["menu-item"]}>
            <Link to="/listingRent" className={classes.link}>
              Rentals
            </Link>
          </li>
          <li className={classes["menu-item"]}>
            <Link to="/about" className={classes.link}>
              About Us
            </Link>
          </li>
          <li className={classes["menu-item"]}>
            <Link to="/contact" className={classes.link}>
              Contact Us
            </Link>
          </li>

          <li className={classes["menu-item"]}>
            <Link to="/user" className={classes.link}>
              Profile
            </Link>
          </li>
          <li className={classes["menu-item"]}>
            {token ? (
              <>
                <button className="button-container" onClick={handleLogout}>
                  LOG OUT
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={classes.link}>
                  <button className="button-container">SIGN IN</button>
                </Link>
                <Link to="/notification">
                  <MdCircleNotifications style={{ fontSize: "54px" }} />
                  <span color="red">{messageLength}</span>
                </Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
