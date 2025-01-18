import React from "react";
import HouseCard from "./HouseCard";
import HouseForSaleData from "./HouseForSaleData";

const HouseList = () => {
  return (
    
    <div>
      {HouseForSaleData.map((house) => (
        <HouseCard
          key={house.id}
          title={house.title}
          location={house.location}
          price={house.price}
          description={house.description}
          specs={house.specs}
          imageUrl={house.image}
        />
      ))}
    </div>
  );
};

export default HouseList;
