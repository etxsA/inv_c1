
-- Configuracion de tabalas en la base de datos. 
CREATE DATABASE IF NOT EXISTS invernadero_web;

USE invernadero_web;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(32) NOT NULL,
    fullname VARCHAR(60) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS invs_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    temp FLOAT NOT NULL, 
    hum FLOAT NOT NULL,
    lum FLOAT NOT NULL,
    pH FLOAT NOT NULL, 
    inv VARCHAR(10) NOT NULL,
    user_id INT,
    measured_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Example Data
INSERT INTO users VALUES
    (1, "Jesus", "1234", "JESUS OINE", "at@at.com");

INSERT INTO invs_data VALUES  
    (1, 2, 3, 4, 5, "inv1", 1, DEFAULT),
    (2, 7.4, 3.5, 2, 3.5, "inv1", 1, DEFAULT),
    (3, 8.4, 2.5, 32, 2.5, "inv1", 1, DEFAULT),
    (4, 9.4, 1.5, 24, 1.5, "inv1", 1, DEFAULT);
