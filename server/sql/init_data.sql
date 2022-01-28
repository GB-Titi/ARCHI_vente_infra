TRUNCATE TABLE customers;

INSERT INTO customers (nom, prenom, email, country, city, postal_code)
 VALUES
 ('Matteoli', 'Tristan', 'tristan_admin@gmail.com', 'France', 'Marseile', 13010),
 ('Massoundi', 'Samir', 'samir_admin@gmail.com', 'France', 'Marseile', 13010);

 TRUNCATE TABLE products;

 INSERT INTO products (label, img, ref, price)
 VALUES
 ('t-shirt', 'https://tommy-europe.scene7.com/is/image/TommyEurope/KG0KG03705_123_alternate1?$main$', 'SHIRT1W', 14.99),
 ('pantalon', 'https://www.procouteaux.com/716-large_default/pantalon-de-cuisine-pantastyle-kentaur.jpg', 'PTL1B', 34.99);

 TRUNCATE TABLE stocks;

 INSERT INTO stocks (product_id, quantity, alert_stock)
 VALUES
 (1, 40, 20),
 (2, 20, 10);

 TRUNCATE TABLE cart;

 INSERT INTO cart (customer_id, product_id, quantity, total_price)
 VALUES
 (1, 1, 2, 29.98),
 (1, 2, 1, 34.99),
  (1, 2, 2, 69.98);

--   TRUNCATE TABLE orders;

--  INSERT INTO orders (cart_id, customer_id, total_paid, order_ref, transaction_id)
--  VALUES
--  ();