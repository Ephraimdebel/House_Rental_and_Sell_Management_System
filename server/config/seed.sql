-- Seed data for Account table
INSERT INTO Account (first_name, last_name, username, email, password, role)
VALUES
    ('John', 'Doe', 'johndoe', 'john.doe@example.com', 'password123', 'User'),
    ('Jane', 'Smith', 'janesmith', 'jane.smith@example.com', 'password456', 'Admin'),
    ('Alice', 'Johnson', 'alicejohnson', 'alice.j@example.com', 'password789', 'Owner');

-- Seed data for House table
INSERT INTO House (location, price, details, ownerId)
VALUES
    ('123 Elm Street', 250000.00, '3 Bedroom, 2 Bath, spacious yard', 3),
    ('456 Oak Avenue', 300000.00, '2 Bedroom, 1 Bath, city view', 2),
    ('789 Maple Drive', 400000.00, '4 Bedroom, 3 Bath, modern design', 3);

-- Seed data for Request table
INSERT INTO Request (houseId, userId, status)
VALUES
    (1, 1, 'Pending'),
    (2, 2, 'Approved'),
    (3, 3, 'Rejected');

-- Seed data for Payment table
INSERT INTO Payment (houseId, userId, ownerId, amount, status)
VALUES
    (1, 1, 3, 250000.00, 'Completed'),
    (2, 2, 2, 300000.00, 'Pending'),
    (3, 3, 3, 400000.00, 'Completed');

-- Seed data for Feedback table
INSERT INTO Feedback (userId, feedbackText)
VALUES
    (1, 'Great house, very spacious!'),
    (2, 'Loved the city view from the property.'),
    (3, 'Modern design and great location.');

-- Seed data for Messages table
INSERT INTO Messages (senderId, receiverId, content, conversationId)
VALUES
    (1, 2, 'Interested in the property on Elm Street.', 'conv-001'),
    (2, 1, 'Thanks, let me know if you need more info.', 'conv-001'),
    (3, 2, 'Can you provide details about the property on Oak Avenue?', 'conv-002');

-- Seed data for Cart table
INSERT INTO Cart (userId, houseId)
VALUES
    (1, 2),
    (2, 1),
    (3, 3);
