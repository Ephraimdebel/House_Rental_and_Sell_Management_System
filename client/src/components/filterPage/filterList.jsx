import React from "react";
import FilterCard from "./filterCard"; 
import filterHouseData from "./filterHouseData";

const FilterList = () => {
  // Ensure filterHouseData is valid
  if (!Array.isArray(filterHouseData) || filterHouseData.length === 0) {
    return <p>No houses available to display.</p>;
  }

  return (
    <div>
      {filterHouseData.map((filter) => (
        <FilterCard
          key={filter.id} // Use FilterCard instead of FilterList
          title={filter.title}
          location={filter.location}
          price={filter.price}
          description={filter.description}
          specs={filter.specs}
          imageUrl={filter.image}
        />
      ))}
    </div>
  );
};

export default FilterList;
