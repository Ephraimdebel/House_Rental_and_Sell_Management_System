import React, { useState } from "react";
import classes from "./Product.module.css";

function ProductCard({ data }) {
  // State to manage the cart
  // const [addedToCart, setAddedToCart] = useState(false);

  // const handleAddToCart = () => {
  //   setAddedToCart(true);
    
  // };
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
          // onClick={handleAddToCart}
          // disabled={addedToCart} // Disable button once item is added to cart
        >
          {/* {addedToCart ? "Added to Cart" : "View Detail"}
           */}
           View Detail
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
