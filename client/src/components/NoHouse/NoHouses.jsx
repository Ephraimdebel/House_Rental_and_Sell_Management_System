import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NoHouses.module.css";
const NoHouses = () => {
    const navigate = useNavigate()
      return (
    <div className={classes.noHousesContainer}>
      <div className={classes.messageBox}>
        <h2>No Results Found</h2>
        <p>
          Unfortunately, we couldn't find any houses that match your criteria.
        </p>
        <button
          className={classes.goBackButton}
          onClick={() => navigate("/")}
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default NoHouses;
