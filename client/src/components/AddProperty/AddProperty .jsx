import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddHouseForm.module.css';

const AddHouseForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    type: '',
    streetAddress: '',
    city: '',
    province: '',
    country: '',
    guestCount: '',
    bedroomCount: '',
    bedCount: '',
    bathroomCount: '',
    title: '',
    description: '',
    price: '',
    videoUrl: '',
    photos: [],
  });

  const categoryOptions = [
    { id: 1, name: 'Apartment' },
    { id: 2, name: 'Condo' },
    { id: 3, name: 'Villa' },
    { id: 4, name: 'House' },
  ];

  const typeOptions = [
    { id: 1, name: 'Sale' },
    { id: 2, name: 'Rental' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('You can upload a maximum of 5 photos.');
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      photos: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mappedData = {
      ...formData,
      category: parseInt(formData.category),
      type: parseInt(formData.type),
    };

    const form = new FormData();
    for (const key in mappedData) {
      if (key === 'photos') {
        mappedData.photos.forEach((photo) => form.append('photos', photo));
      } else {
        form.append(key, mappedData[key]);
      }
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5500/api/addHouse',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      window.location.reload();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Property Listing</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Category and Type */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categoryOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="">Select Type</option>
              {typeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address Details */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Street Address</label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Province</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Counts */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Guest Count</label>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label>Bedroom Count</label>
            <input
              type="number"
              name="bedroomCount"
              value={formData.bedroomCount}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label>Bed Count</label>
            <input
              type="number"
              name="bedCount"
              value={formData.bedCount}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label>Bathroom Count</label>
            <input
              type="number"
              name="bathroomCount"
              value={formData.bathroomCount}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Title and Description */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Price and Video */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label>Video URL</label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Photos */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Property Photos</label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddHouseForm;
