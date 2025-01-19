import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/heroImage/landingImage.jpg";
import breakingLine from "../../assets/heroImage/breakingLine.png";
import classes from "./Hero.module.css";
import Slider from "@mui/material/Slider";

const Hero = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    city: "",
    bathrooms: "",
    propertyScope: "",
    propertyType: "",
    priceRange: [100, 1000000],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const propertyTypeMapping = {
      Apartment: 1,
      Condo: 2,
      Villa: 3,
      House: 4,
    };
  
    const propertyScopeMapping = {
      Sale: 1,
      Rental: 2,
    };
  
    // Create query string with mapped values
    const queryParams = new URLSearchParams({
      city: filters.city,
      bathrooms: filters.bathrooms,
      type: propertyTypeMapping[filters.propertyType],
      category: propertyScopeMapping[filters.propertyScope],
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
    }).toString();
  

    // Navigate to the /filter page with the query string
    navigate(`/filter?${queryParams}`);
  };

  return (
    <div className={classes.hero_image}>
      <div
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className={classes.textContainer}>
          <h1 className={classes.title}>Find Your Property</h1>
          <img
            src={breakingLine}
            alt="Breaking Line"
            className={classes.breakingLine}
          />
          <p className={classes.description}>
            Discover the best properties to match your lifestyle.
          </p>

          <form className={classes.searchForm} onSubmit={handleSubmit}>
            {/* Row 1: Location, Bathrooms, Property Scope */}
            <div className={classes.row}>
              <div className={classes.inputContainer}>
                <label>Location:</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter an address, state, city..."
                  value={filters.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className={classes.selectContainer}>
                <label>Bathrooms:</label>
                <select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className={classes.selectContainer}>
                <label>Property Scope:</label>
                <select
  name="propertyScope"
  value={filters.propertyScope}
  onChange={handleInputChange}
>
  <option value="">Select</option> {/* Add this line */}
  <option value="Sale">Sale</option>
  <option value="Rental">Rental</option>
</select>

              </div>
            </div>

            {/* Row 2: Property Type, Price Range, and Find Button */}
            <div className={classes.row}>
              <div className={classes.selectContainer}>
                <label>Property Type:</label>
                <select
  name="propertyType"
  value={filters.propertyType}
  onChange={handleInputChange}
>
  <option value="">Select</option> {/* Add this line */}
  <option value="Apartment">Apartment</option>
  <option value="Condo">Condo</option>
  <option value="Villa">Villa</option>
  <option value="House">House</option>
</select>

              </div>

              <div className={classes.rangeContainer}>
                <label>Price Range:</label>
                <Slider
                  value={filters.priceRange}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  min={100}
                  max={1000000}
                />
              </div>

              <button type="submit" className={classes.findButton}>
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
