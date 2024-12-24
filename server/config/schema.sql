-- schema.sql

-- Table for user accounts with roles
CREATE TABLE Account (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Auto-incrementing primary key
    first_name VARCHAR(50) NOT NULL,          -- First name
    last_name VARCHAR(50) NOT NULL,           -- Last name
    username VARCHAR(50) NOT NULL UNIQUE,     -- Unique username
    email VARCHAR(100) NOT NULL UNIQUE,       -- Unique email
    password VARCHAR(255) NOT NULL,           -- Password
    role ENUM('User', 'Admin', 'Owner') NOT NULL -- Role field to distinguish accounts
);

-- Table for houses
CREATE TABLE House (
    houseId INT AUTO_INCREMENT PRIMARY KEY,   -- Auto-incrementing primary key
    location VARCHAR(255) NOT NULL,           -- Location of the house
    price DECIMAL(10, 2) NOT NULL,            -- Price of the house
    details TEXT,                             -- Additional details
    ownerId INT NOT NULL,                     -- Reference to Account ID (foreign key)
    FOREIGN KEY (ownerId) REFERENCES Account(id)
);

-- Table for requests
CREATE TABLE Request (
    requestId INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing primary key
    houseId INT NOT NULL,                     -- Reference to House ID (foreign key)
    userId INT NOT NULL,                      -- Reference to Account ID (foreign key)
    status VARCHAR(50) NOT NULL,              -- Status of the request
    FOREIGN KEY (houseId) REFERENCES House(houseId),
    FOREIGN KEY (userId) REFERENCES Account(id)
);

-- Table for payments
CREATE TABLE Payment (
    paymentId INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing primary key
    houseId INT NOT NULL,                     -- Reference to House ID (foreign key)
    userId INT NOT NULL,                      -- Reference to Account ID (foreign key)
    ownerId INT NOT NULL,                     -- Reference to Account ID (foreign key)
    amount DECIMAL(10, 2) NOT NULL,           -- Payment amount
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of the payment
    status VARCHAR(50) NOT NULL,              -- Payment status
    FOREIGN KEY (houseId) REFERENCES House(houseId),
    FOREIGN KEY (userId) REFERENCES Account(id),
    FOREIGN KEY (ownerId) REFERENCES Account(id)
);

-- Table for feedback
CREATE TABLE Feedback (
    feedbackId INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing primary key
    userId INT NOT NULL,                       -- Reference to Account ID (foreign key)
    feedbackText TEXT NOT NULL,                -- Feedback content
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of feedback
    FOREIGN KEY (userId) REFERENCES Account(id)
);

-- Table for messages
CREATE TABLE Messages (
    messageId INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing primary key
    senderId INT NOT NULL,                    -- Reference to Account ID (foreign key)
    receiverId INT NOT NULL,                  -- Reference to Account ID (foreign key)
    content TEXT NOT NULL,                    -- Message content
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp of the message
    conversationId VARCHAR(100) NOT NULL,     -- Conversation identifier
    FOREIGN KEY (senderId) REFERENCES Account(id),
    FOREIGN KEY (receiverId) REFERENCES Account(id)
);

-- Table for cart
CREATE TABLE Cart (
    cartId INT AUTO_INCREMENT PRIMARY KEY,    -- Auto-incrementing primary key
    userId INT NOT NULL,                      -- Reference to Account ID (foreign key)
    houseId INT NOT NULL,                     -- Reference to House ID (foreign key)
    FOREIGN KEY (userId) REFERENCES Account(id),
    FOREIGN KEY (houseId) REFERENCES House(houseId)
);
