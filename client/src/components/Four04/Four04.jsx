import React from "react";
import { Link } from "react-router-dom";
import "./Four04.css"; // Create this CSS file for styling

function Four04() {
  return (
    <div className="four04-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! The page you're looking for can't be found.</p>
        <Link to="/" className="home-link">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Four04;
