-- Create Users Table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Categories Table
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Types Table
CREATE TABLE Types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Facilities Table
CREATE TABLE Facilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Listings Table
CREATE TABLE Listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    creator_id INT,
    category_id INT NOT NULL,
    type_id INT NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    guest_count INT NOT NULL,
    bedroom_count INT NOT NULL,
    bed_count INT NOT NULL,
    bathroom_count INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    highlight VARCHAR(255) NOT NULL,
    highlight_desc TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT FALSE,
    longitude DECIMAL(10, 8) NOT NULL,
    latitude DECIMAL(11, 8) NOT NULL,
    video_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES Users (id),
    FOREIGN KEY (category_id) REFERENCES Categories (id),
    FOREIGN KEY (type_id) REFERENCES Types (id)
);

-- Create Pivot Table for Listings and Facilities (Many-to-Many Relationship)
CREATE TABLE ListingFacilities (
    listing_id INT NOT NULL,
    facility_id INT NOT NULL,
    PRIMARY KEY (listing_id, facility_id),
    FOREIGN KEY (listing_id) REFERENCES Listings (id),
    FOREIGN KEY (facility_id) REFERENCES Facilities (id)
);

-- Create Booked Dates Table
CREATE TABLE BookedDates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES Listings (id)
);

-- Create Listing Photos Table
CREATE TABLE ListingPhotos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT NOT NULL,
    photo_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES Listings (id)
);
