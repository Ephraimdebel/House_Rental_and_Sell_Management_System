import React from "react";
import "./user_profile.css";

const userData = {
  name: "Abebe Bikila",
  role: "Renter",
  email: "abebe.bikila@example.com",
  phone: "+251 911 123 456",
  address: "123 Addis Ababa, Ethiopia",
  rentedHouses: [
    "456 Bole Rd, Addis Ababa, Ethiopia",
    "789 Piassa, Addis Ababa, Ethiopia",
  ],
  rentalHistory: [
    "Rental #1 - 01/2022 to 06/2022",
    "Rental #2 - 07/2022 to 12/2022",
  ],
};

const UserProfile = () => {
  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="profile-card">
        <div className="profile-avatar">
          <span>
            {userData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="profile-details">
          <h3>{userData.name}</h3>
          <p className="profile-role">{userData.role}</p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
          <p>
            <strong>Address:</strong> {userData.address}
          </p>
          <p>
            <strong>Rented Houses:</strong>
          </p>
          <ul>
            {userData.rentedHouses.map((house, index) => (
              <li key={index}>{house}</li>
            ))}
          </ul>
          <p>
            <strong>Rental History:</strong>
          </p>
          <ul>
            {userData.rentalHistory.map((history, index) => (
              <li key={index}>{history}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
