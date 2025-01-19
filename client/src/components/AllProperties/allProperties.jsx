import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./allProperties.module.css";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true; // Track component mount status
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/houses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: signal, // Attach the signal to the request
        });

        // Ensure the component is still mounted before calling setState
        if (isMounted) {
          setProperties(response?.data?.data || []); // Ensure response.data exists and map to the correct data path
          setLoading(false);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          // Handle the case when the request is aborted
          console.log("Request was aborted");
        } else {
          console.error("Error fetching properties:", error);
        }
        setLoading(false);
      }
    };

    fetchProperties();

    // Cleanup function to cancel the request if component unmounts
    return () => {
      isMounted = false; // Mark the component as unmounted
      abortController.abort();
    };
  }, [token]);

  // Handle delete property
  const handleDelete = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5500/api/house/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setProperties((prevProperties) =>
            prevProperties.filter(
              (property) => property.id !== propertyId // Adjust propertyId to the correct field (e.g., `id`)
            )
          );
        } else {
          console.error(
            "Failed to delete property, status code:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  if (loading) {
    return <h1>Loading properties...</h1>;
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
          {Array.isArray(properties) &&
            properties.map((property) => (
              <tr key={property.id}>
                <td>{property.id}</td>
                <td>{property.creator_name}</td>
                <td>{property.title}</td>
                <td>{property.type}</td>
                <td>{property.city}</td>
                <td>{new Date(property.createdAt).toLocaleDateString()}</td>
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
                    onClick={() => handleDelete(property.id)} // Adjust propertyId to the correct field (e.g., `id`)
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
