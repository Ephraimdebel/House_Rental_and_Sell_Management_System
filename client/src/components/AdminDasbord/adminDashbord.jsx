import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import styles from "./adminDashbord.module.css";
import AllUsers from "../UserTable.jsx/userTable";

const AdminDashboard = () => {
  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link to="/adminDashbord">Dashboard</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/allusers">All Users</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/allproperties">All Properties</Link>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className={styles.content}>
        <Routes>
          <Route
            path="/dashboard"
            element={<h1>Welcome to the Admin Dashboard</h1>}
          />
          <Route path="/all-users" element={<AllUsers />} />
          <Route
            path="/all-properties"
            element={<h1>All Properties Page</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
