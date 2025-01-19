import React, { useEffect, useState } from "react";
import breakingLine from "../../assets/heroImage/breakingLine.png";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";

function Product() {
  // State to store the fetched data
  const [productData, setProductData] = useState([]);
  
  // Function to fetch data from the backend
  const fetchProductData = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/housetype?type_id=1");
      const data = await response.json();
      console.log(data)
      setProductData(data.data); // Store the data in state
      // if (data.message === "Listings with type_id 2 retrieved successfully") {
      // } else {
      //   console.error("Error fetching data");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className={classes.product__container}>
      <div className={classes.product__intro}>
        <h2>Properties For Rent</h2>
        <img
          src={breakingLine}
          alt="Breaking Line"
          className={classes.breakingLine}
        />
        <p className={classes.description}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
      </div>

      <hr className={classes.breakLine} />

      <div className={classes.product__grid}>
        {productData.length > 0 ? (
          productData.map((info) => (
            <ProductCard key={info.id} data={info} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Product;
