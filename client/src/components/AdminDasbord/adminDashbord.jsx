import React from "react";
import { Link } from "react-router-dom";
import styles from "./adminDashbord.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/all-users">All Users</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/all-properties">All Properties</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
