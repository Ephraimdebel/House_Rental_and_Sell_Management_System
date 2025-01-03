import React from 'react'
import { productData } from "./productData"; // Use productData instead of categoryInfos
import breakingLine from "../../assets/heroImage/breakingLine.png";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";

function ProductSale() {
  return (
    <div>
      <div className={classes.product__container}>
        <div className={classes.product__intro}>
          <h2>Properties For Sale</h2>
          <img
            src={breakingLine}
            alt="Breaking Line"
            className={classes.breakingLine}
          />
          <p className={classes.description}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </div>

        <hr className={classes.breakLine} />

        <div className={classes.product__grid}>
          {productData.map((info) => (
            <ProductCard key={info.location} data={info} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSale
