import React from "react";
import "./owner_profile.css";

const ownerData = {
    name: "Abebe Kebede",
    role: "Owner",
    email: "abebe.kebede@example.com",
    phone: "+251 911 123 456",
    ownedHouses: [
        "Bole, Addis Ababa, Ethiopia",
        "Kazanchis, Addis Ababa, Ethiopia",
        "Piassa, Addis Ababa, Ethiopia"
    ]
};

const OwnerProfile = ({ data }) => {
    return (
        <div className="profile">
            <h2>Owner Profile</h2>
            <div className="profile-card">
                <div className="profile-avatar" style={{ backgroundColor: "#673ab7" }}>
                    <span>{data.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div className="profile-details">
                    <h3>{data.name}</h3>
                    <p className="profile-role">{data.role}</p>
                    <p>
                        <strong>Email:</strong> {data.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {data.phone}
                    </p>
                    <p>
                        <strong>Owned Houses:</strong>
                    </p>
                    <ul>
                        {data.ownedHouses.map((house, index) => (
                            <li key={index}>{house}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default () => <OwnerProfile data={ownerData} />;
