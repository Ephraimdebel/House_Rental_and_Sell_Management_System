import React from "react";
import classes from "./HouseCard.module.css"; // Assuming you have this CSS module
import HouseForSaleData from "./HouseForSaleData"; // Ensure this is correctly imported

const HouseCard = ({
  title,
  location,
  price,
  description,
  specs,
  imageUrl,
}) => {
  return (
    <div className={classes["house-card"]}>
      <div className={classes["house-card-content"]}>
        <div className={classes["house-details"]}>
          <h2>{title}</h2>
          <p className={classes["location"]}>{location}</p>
          <h1 className={classes["price"]}>
            ${price.toLocaleString()} <span>For Sale</span>
          </h1>
          <p className={classes["description"]}>{description}</p>
          <div className={classes["house-specs"]}>
            {specs.map((spec, index) => (
              <div key={index} className={classes["spec"]}>
                <img src={spec.icon} alt={spec.label} />
                <span>{spec.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={classes["house-image"]}>
          <img
            src={imageUrl}
            alt="House"
            onError={(e) => (e.target.src = "fallback-image-url.jpg")}
          />
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
