CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dogs (
    dog_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    breed VARCHAR(255),
    age INT,
    gender ENUM('Male', 'Female'),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE matches (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    dog1_id INT,
    dog2_id INT,
    status ENUM('Pending', 'Matched', 'Rejected'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dog1_id) REFERENCES dogs(dog_id) ON DELETE CASCADE,
    FOREIGN KEY (dog2_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
);

CREATE TABLE interests (
    interest_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    dog_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (dog_id) REFERENCES dogs(dog_id) ON DELETE CASCADE
);
