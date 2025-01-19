import React, { useEffect, useState } from "react";
import breakingLine from "../../assets/heroImage/breakingLine.png";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function Product() {
  // State to store the fetched data
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch data from the backend with pagination
  const fetchProductData = async (page = 1) => {
    setLoading(true); // Set loading to true when fetching
    try {
      const response = await fetch(
        `http://localhost:5500/api/housetype?type_id=1&page=${page}&limit=6`
      );
      const data = await response.json();
      console.log(data);

      setProductData(data.data); // Store the data in state
      setCurrentPage(data.currentPage); // Set the current page
      setTotalPages(data.totalPages); // Set the total pages
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Fetch data when the component mounts or page changes
  useEffect(() => {
    fetchProductData(currentPage);
  }, [currentPage]);

  return (
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
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
      </div>

      <hr className={classes.breakLine} />

      <div className={classes.product__grid}>
        {loading ? (
          <p>Loading...</p>
        ) : productData.length > 0 ? (
          productData.map((info) => <ProductCard key={info.id} data={info} />)
        ) : (
          <p>No properties found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className={classes.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaAngleLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default Product;
