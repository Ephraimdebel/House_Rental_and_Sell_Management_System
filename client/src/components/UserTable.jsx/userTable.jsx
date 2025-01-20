import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./userTable.module.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch all users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/api/users/getAllUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.users); // Assuming the response returns an array of users
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]); // Depend on token to refetch if it changes

  // Handle delete user
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Log the token and userId for debugging
        console.log("Token:", token);
        console.log("User ID to delete:", userId);

        const response = await axios.delete(
          `http://localhost:5500/api/users/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check response status and log it
        console.log("Delete response:", response);

        if (response.status === 200) {
          // Update state after deletion only if response is successful
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
        } else {
          console.error("Failed to delete user, status code:", response.status);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) {
    return <h1>Loading users...</h1>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Users</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)} // Corrected to call handleDelete
                    className="btn btn-danger"
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

export default AllUsers;
