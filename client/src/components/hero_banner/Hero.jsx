import React, { useState } from "react";
import heroImage from "../../assets/heroImage/landingImage.jpg";
import breakingLine from "../../assets/heroImage/breakingLine.png";
import classes from "./Hero.module.css";
import Slider from "@mui/material/Slider";

const Hero = () => {
  const [priceRange, setPriceRange] = useState({ min: 120000, max: 820000 });
  const [value1, setValue1] = useState([120000, 820000]); // initial range (min: 20, max: 80)

const handleChange = (event, newValue) => {
  setValue1(newValue);
};

  
 const valuetext = (value) => {
  return `$${value}`;
};


  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={classes.hero_image}>
      {/* Background Image */}
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

          <form className={classes.searchForm}>
            {/* Row 1: Location, Bathrooms, Property Scope */}
            <div className={classes.row}>
              <div className={classes.inputContainer}>
                <label>Location:</label>
                <input
                  type="text"
                  placeholder="Enter an address, state, city..."
                />
              </div>

              <div className={classes.selectContainer}>
                <label>Bathrooms:</label>
                <select>
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
                <select>
                  <option value="rental">Rental</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
            </div>

            {/* Row 2: Property Type, Price Range, and Find Button */}
            <div className={classes.row}>
              <div className={classes.selectContainer}>
                <label>Property Type:</label>
                <select>
                  <option value="apartment">Apartment</option>
                  <option value="duplex">Duplex</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              <div className={classes.rangeContainer}>
                <label>Price Range:</label>
                <div className={classes.rangeWrapper}>
                  {/* <input
                    type="range"
                    name="min"
                    min="120000"
                    max="820000"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                    className={classes.rangeInput}
                  /> */}
                  {/* <input
                    type="range"
                    name="max"
                    min="120000"
                    max="820000"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                    className={classes.rangeInput}
                  /> */}
                </div>
                {/* <div className={classes.priceLabels}>
                  <span>${priceRange.min}</span> -{" "}
                  <span>${priceRange.max}</span>
                </div> */}
               <Slider
  value={value1}
  onChange={handleChange}
  valueLabelDisplay="auto"
  valueLabelFormat={valuetext}
  getAriaLabel={() => "Price range"}
  // valueLabelDisplay="auto"
  getAriaValueText={valuetext}
  disableSwap
  min={120000} // min price value
  max={8400000} // max price value
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
