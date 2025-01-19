import React, { useState } from "react";
import classes from "./Product.module.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ data }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/house/${id}`);
  };
  console.log("data: ",data)

  return (
    <div className={classes.productCard}>
      <img
        src={data.listingPhotoPaths[1]}
        alt={data.location}
        className={classes.productCard__image}
      />
      <div className={classes.productCard__info}>
        <div className={classes.productCard__left}>
          <h3>{data.city}</h3>
          <p>{data.bathroomCount} bathrooms</p>
        </div>
        <div className={classes.productCard__right}>
          <p>For Rent</p>
          <p>{data.price}$ per day</p>
        </div>
      </div>

      {/* View Detail Button */}
      <div className={classes.productCard__buttonContainer}>
      <button
    className={classes.addToCartButton}
    onClick={() => handleCardClick(data.id)} // Corrected here
  >
    View Detail
  </button>
      </div>
    </div>
  );
}

export default ProductCard;
