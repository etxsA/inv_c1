
-- Configuracion de tabalas en la base de datos. 
CREATE DATABASE IF NOT EXISTS invernadero_web;

USE invernadero_web;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
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

-


--- CORRECCION DE EQUEMA 
--- ESQUEMA FINAL DE BASE DE DATOS -- Agregando datos de todos los sensores

CREATE DATABASE IF NOT EXISTS invernadero_web;

USE invernadero_web;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    fullname VARCHAR(60) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS invs_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    temp FLOAT NOT NULL, 
    hum INT NOT NULL,
    ldr INT NOT NULL, 
    lum FLOAT NOT NULL,
    shum INT NOT NULL, 
    pH FLOAT NOT NULL, 
    inv VARCHAR(10) NOT NULL,
    user_id INT,
    measured_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
















- Example Data
INSERT INTO users VALUES
    (1, "Jesus", "1234", "JESUS OINE", "at@at.com");

INSERT INTO invs_data VALUES  
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 30 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 29 DAY),
    (DEFAULT, 6, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 28 DAY),
    (DEFAULT, 6, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 28 DAY),
    (DEFAULT, 6, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 28 DAY),
    (DEFAULT, 5, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 26 DAY),
    (DEFAULT, 7, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 25 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 24 DAY),
    (DEFAULT, 9, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 23 DAY),
    (DEFAULT, 3, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 22 DAY),
    (DEFAULT, 1, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 21 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 20 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 19 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 18 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 17 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 16 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 15 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 14 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 13 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 12 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 11 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 10 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 9 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 8 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 7 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 8 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 6 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 5 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 4 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 3 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 2 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 1 DAY),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 1 MONTH),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 2 MONTH),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 3 MONTH),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 4 MONTH),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 5 MONTH),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 6 MONTH),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 7 MONTH),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 8 MONTH),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 9 MONTH),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 1 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 5 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 10 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 30 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 40 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 60 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 70 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 100 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 150 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 180 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 200 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 310 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 324 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 777 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 560 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 440 MINUTE),
    (DEFAULT, 2, 3, 4, 5, 6, 7, "inv1", 1, NOW() - INTERVAL 900 MINUTE);





-- Comandos Utiles

 SELECT DAY(measured_at) as DAY, AVG(temp) as Avg_temp, MONTH(ANY_VALUE(measured_at)) FROM invs_data GROUP BY Week;
-- await pool.query('SELECT * FROM invs_data WHERE user_id = ? && inv = ? && measured_at >= NOW() - INTERVAL 1 DAY', [1, 'inv1'])

SELECT * FROM invs_data WHERE user_id = ? && inv = ? && measured_at >= NOW() - INTERVAL 1 DAY

SELECT WEEK(measured_at) as Week, AVG(temp) as temp, AVG(hum) as hum, AVG(lum) as lum, AVG(pH) as pH, ANY_VALUE(inv) as inv FROM invs_data WHERE user_id = 1 AND inv = 'inv1' AND measured_at >= NOW() - INTERVAL 1 WEEK GROUP BY Week;

-- EN uso SEmana
-- SELECT WEEK(measured_at) as Week, AVG(temp) as temp, AVG(hum) as hum, AVG(lum) as lum, AVG(pH) as pH, ANY_VALUE(inv) as inv, MAX(measured_at) as measured_at FROM invs_data WHERE user_id = ? AND inv = ? AND measured_at >= NOW() - INTERVAL 1 WEEK GROUP BY Week;


SELECT DAY(measured_at) as day, CONCAT(DAY(MAX(measured_at)),"/",MONTH(MAX(measured_at))) as Date, AVG(temp) as temp, AVG(hum) as hum, AVG(lum) as lum, AVG(pH) as pH, ANY_VALUE(inv) as inv, MAX(measured_at) as measured_at FROM invs_data WHERE user_id =? AND inv = ? AND measured_at >= NOW() - INTERVAL 7 DAY GROUP BY day

-- hours
SELECT HOUR(measured_at) as hour, TIME(MAX(measured_at)) as Date, AVG(temp) as temp, AVG(hum) as hum, AVG(lum) as lum, AVG(pH) as pH, ANY_VALUE(inv) as inv, MAX(measured_at) as measured_at FROM invs_data WHERE user_id =? AND inv = ? AND measured_at >= NOW() - INTERVAL 24 HOUR GROUP BY hour
