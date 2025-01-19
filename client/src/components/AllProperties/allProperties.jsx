import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./allProperties.module.css";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch all users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/houses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]); // Depend on token to refetch if it changes

  const deleteProperty = (id) => {
    // DELETE request to remove the property
    axios
      .delete(`http://localhost:5500/api/houses/${id}`)
      .then((response) => {
        console.log(response.data);
        // After deleting, remove the property from the UI
        setProperties(
          properties.filter((property) => property.property_id !== id)
        );
      })
      .catch((error) => console.error("Error deleting property:", error));
  };

  if (loading) {
    return <div>Loading properties...</div>; // Show loading message
  }

  return (
    <div>
      <h1>All Properties</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>PropertyID</th>
            <th>Creator Name</th>
            <th>Title</th>
            <th>Type</th>
            <th>City</th>
            <th>Created At</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.property_id}>
              <td>{property.property_id}</td>
              <td>{property.creator_name}</td>
              <td>{property.title}</td>
              <td>{property.type}</td>
              <td>{property.city}</td>
              <td>{new Date(property.created_at).toLocaleDateString()}</td>
              <td>{property.category}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "#E74C3C",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteProperty(property.property_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProperties;
