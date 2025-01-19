import React, { useEffect, useState } from "react";
import FilterCard from "../filterPage/FilterCard";
import classes from "../filterPage/filter.module.css";
import NoHouses from "../NoHouse/NoHouses";

const ListingHouseSell = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
    const getSellHouse = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:5500/api/housetype?type_id=1");

        if (!response.ok) {
          throw new Error("Failed to fetch houses");
        }
        const data = await response.json();
        console.log("response ",response.data)
        setHouses(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    getSellHouse();
  }, []); // Re-fetch when searchParams change

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

export default ListingHouseSell;
