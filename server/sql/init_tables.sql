
DROP TABLE products; 

CREATE TABLE products
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    label VARCHAR(255) NOT NULL,
    img VARCHAR(255),
    ref VARCHAR(255),
    price DECIMAL(10,2) NOT NULL
);

DROP TABLE customers; 

CREATE TABLE customers
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    city VARCHAR(255),
    postal_code VARCHAR(5)
);

DROP TABLE stocks; 

CREATE TABLE stocks
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    alert_stock INT
);

DROP TABLE cart; 

CREATE TABLE cart
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

DROP TABLE orders; 

CREATE TABLE orders
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cart_id INT NOT NULL,
    customer_id INT NOT NULL,
    total_paid DECIMAL(10,2) NOT NULL,
    order_ref VARCHAR(100),
    transaction_id VARCHAR(255)
);