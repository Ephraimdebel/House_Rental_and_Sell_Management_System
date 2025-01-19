import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterCard from "./FilterCard";
import classes from "./filter.module.css";
import NoHouses from "../NoHouse/NoHouses";

const FilterList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams(); // To read query parameters from the URL

  useEffect(() => {
    const fetchFilteredHouses = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams(searchParams).toString(); // Generate query string
        console.log("Query params:", queryParams)
        const response = await fetch(`http://localhost:5500/api/filteredhouse?${queryParams}`);

        if (!response.ok) {
          throw new Error("Failed to fetch houses");
        }

        const data = await response.json();
        setHouses(data.houses || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredHouses();
  }, [searchParams]); // Re-fetch when searchParams change

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className={classes.error}>Error: {error}</p>;
  }

  if (houses.length === 0) {
    return <NoHouses />;
  }

  return (
    <div className={classes["filter-list"]}>
      {houses?.map((house) => (
        <FilterCard
          key={house.id}
          id={house.id}
          title={house.title}
          location={house.city}
          price={house.price}
          description={house.description}
          specs={[
            { icon: "bathroom-icon.png", label: `${house.bathroomCount} Bathrooms` },
            { icon: "bedroom-icon.png", label: `${house.bedroomCount} Bedrooms` },
          ]}
          imageUrl={house.listingPhotoPaths[0]}
        />
      ))}
    </div>
  );
};

export default FilterList;
