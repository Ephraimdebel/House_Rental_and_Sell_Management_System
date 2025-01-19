import "./post_house.css";
import { useNavigate } from "react-router-dom";

const PostHouse = () => {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // Prevent form's default action

    const formData = new FormData(event.target); // Capture form data
    const houseData = {
      title: formData.get("house-title"),
      description: formData.get("house-description"),
      price: formData.get("house-price"),
      location: formData.get("house-location"),
      image: formData.get("house-image"),
    };
    fetch("https://reqres.in/api/house", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("House posted successfully:", data);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error posting house:", error);
      });
  }

  return (
    <div className="post-house">
      <h2>Post House</h2>
      <form
        className="post-house-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="house-title">House Title</label>
          <input type="text" id="house-title" name="house-title" required />
        </div>
        <div className="form-group">
          <label htmlFor="house-description">House Description</label>
          <textarea id="house-description" name="house-description" required />
        </div>
        <div className="form-group">
          <label htmlFor="house-price">House Price</label>
          <input type="number" id="house-price" name="house-price" required />
        </div>
        <div className="form-group">
          <label htmlFor="house-location">House Location</label>
          <input
            type="text"
            id="house-location"
            name="house-location"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="house-image">House Image</label>
          <input type="file" id="house-image" name="house-image" />
        </div>
        <button type="submit">Post House</button>
      </form>
    </div>
  );
};

export default PostHouse;
