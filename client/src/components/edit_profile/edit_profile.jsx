import "./edit_profile.css";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      const parsedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(parsedToken.userId);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      try {
        const response = await fetch(`https://reqres.in/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Profile updated successfully");
        } else {
          console.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user-name">Name</label>
          <input
            type="text"
            id="user-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user-email">Email</label>
          <input
            type="email"
            id="user-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user-phone">Phone</label>
          <input
            type="tel"
            id="user-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user-address">Address</label>
          <input
            type="text"
            id="user-address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user-password">Password</label>
          <input
            type="password"
            id="user-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
