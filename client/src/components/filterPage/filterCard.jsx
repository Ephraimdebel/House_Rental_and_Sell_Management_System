import React from "react";
import classes from "./filter.module.css";

const FilterCard = ({
  title,
  location,
  price,
  description,
  specs = [], 
  imageUrl,
}) => {
  return (
    <div className={classes["filter-card"]}>
      <div className={classes["filter-card-content"]}>
        {/* House Details */}
        <div className={classes["filter-details"]}>
          <h2>{title}</h2>
          <p className={classes["location"]}>{location}</p>
          <h1 className={classes["price"]}>
            {price ? `$${price.toLocaleString()}` : "Price not available"}{" "}
            <span>For Sale</span>
          </h1>
          <p className={classes["description"]}>{description}</p>

          {/* Specs */}
          {specs.length > 0 && (
            <div className={classes["filter-specs"]}>
              {specs.map((spec, index) => (
                <div key={index} className={classes["spec"]}>
                  <img src={spec.icon} alt={spec.label || "Specification"} />
                  <span>{spec.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* House Image */}
        <div className={classes["filter-image"]}>
          <img
            src={imageUrl || "default-image.jpg"} // Fallback image
            alt="filter"
            onError={(e) => (e.target.src = "fallback-image-url.jpg")}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
