-- Insert dummy data into Manufacturer table
INSERT INTO Manufacturer (manufacturer_name, email, address)
VALUES 
  ('ABC Pharma', 'abc@example.com', '123 Main Street'),
  ('XYZ Pharmaceuticals', 'xyz@example.com', '456 Oak Avenue'),
  ('PQR Health Solutions', 'pqr@example.com', '789 Elm Boulevard');

-- Insert dummy data into medicine table
INSERT INTO medicine (med_name, price, image, generic_name, package_type, med_form, isOTC, manufacturer_id, indication, dosage, dosageStrength, cautions)
VALUES
  ('Medicine A', 19.99, 'image_a.jpg', 'Generic A', 'Box', 'Tablet', true, 1, 'Pain Relief', 'Take one tablet daily', 50, 'Avoid alcohol consumption'),
  ('Medicine B', 29.99, 'image_b.jpg', 'Generic B', 'Bottle', 'Capsule', false, 2, 'Allergy Relief', 'Take two capsules as needed', 25, 'Consult doctor before use'),
  ('Medicine C', 15.99, 'image_c.jpg', 'Generic C', 'Blister', 'Liquid', true, 3, 'Cough and Cold', 'Take 5ml every 4 hours', 100, 'Keep out of reach of children');



	
INSERT INTO Chemical (chem_name, image, iupac_name, manufacturer_id, parent_chemical_id, chemical_formula, description, molecular_weight, price)
VALUES 
  ('Chemical1', 'chemical1_image.jpg', 'IUPAC1', 1, null, 'C6H12O6', 'Description1', 180.156, 25.99),
  ('Chemical2', 'chemical2_image.jpg', 'IUPAC2', 2, 1, 'C8H10N4O2', 'Description2', 194.190, 35.75),
  ('Chemical3', 'chemical3_image.jpg', 'IUPAC3', 3, null, 'C10H16N2O3S', 'Description3', 275.358, 42.50);
	
	
	
-- Insert dummy data into Customer table
INSERT INTO Customer (customer_id, email, phone, password, customer_name, date_of_birth, image, gender, address, billing_address)
VALUES 
  (UUID_generate_v4(), 'john.doe@example.com', '123-456-7890', 'hashed_password_1', 'John Doe', '1990-05-15', 'john_image.jpg', true, '123 Main Street', 'Billing Street 1'),
  (UUID_generate_v4(), 'jane.smith@example.com', '987-654-3210', 'hashed_password_2', 'Jane Smith', '1985-08-22', 'jane_image.jpg', false, '456 Oak Avenue', 'Billing Street 2'),
  (UUID_generate_v4(), 'bob.johnson@example.com', '555-123-4567', 'hashed_password_3', 'Bob Johnson', '1978-12-10', 'bob_image.jpg', true, '789 Elm Boulevard', 'Billing Street 3'),
  (UUID_generate_v4(), 'alice.williams@example.com', '111-222-3333', 'hashed_password_4', 'Alice Williams', '1995-03-03', 'alice_image.jpg', false, '999 Pine Lane', 'Billing Street 4');

-- Insert dummy data into Researcher table
INSERT INTO Researcher (researcher_id, email, phone, password, researcher_name, date_of_birth, image, gender, address, billing_address, isApproved)
VALUES 
  (UUID_generate_v4(), 'researcher1@example.com', '123-456-7890', 'hashed_password_5', 'Researcher One', '1990-01-15', 'researcher1_image.jpg', true, '123 Main Street', 'Billing Street 1', true),
  (UUID_generate_v4(), 'researcher2@example.com', '987-654-3210', 'hashed_password_6', 'Researcher Two', '1985-05-20', 'researcher2_image.jpg', false, '456 Oak Avenue', 'Billing Street 2', false),
  (UUID_generate_v4(), 'researcher3@example.com', '555-123-7890', 'hashed_password_7', 'Researcher Three', '1992-08-10', 'researcher3_image.jpg', true, '789 Pine Lane', 'Billing Street 3', true);




-- Insert dummy data into MedicineChemical table
INSERT INTO MedicineChemical (medicine_id, chemical_id, purpose)
VALUES 
  (1, 1, 'Pain Relief'),
  (2, 2, 'Allergy Relief'),
  (3, 3, 'Cough and Cold');

-- Insert dummy data into Cart table for Customers
INSERT INTO Cart (isCustomer, customer_id, researcher_id)
VALUES 
  (true, 'ef3bf2f7-e284-4502-9b10-2acded5a8b8a', null),
  (true, '69c01d8c-bd7b-48e0-a23d-40463b2896e3', null),
  (true, 'd51fe764-b1a9-4b2c-9b3e-26b2df5588c4', null);

-- Insert dummy data into Cart table for Researchers
INSERT INTO Cart (isCustomer, customer_id, researcher_id)
VALUES 
  (false, null, '968d0d79-e570-45ff-8bc1-d8ffff630aab'),
  (false, null, '852ad127-70ff-4c12-8e57-cce2e86b11d6'),
  (false, null, '6d71f4eb-7751-4d53-86e5-dfa67f737c65');

-- Insert dummy data into Orders table for Customers
INSERT INTO Orders (shipment_date, status, price, order_date, cart_id)
VALUES 
  ('2024-01-20', true, 35.99, '2024-01-15', 1),
  ('2024-01-22', false, 20.75, '2024-01-18', 2),
  ('2024-01-25', true, 15.99, '2024-01-20', 3);

-- Insert dummy data into Orders table for Researchers
INSERT INTO Orders (shipment_date, status, price, order_date, cart_id)
VALUES 
  ('2024-01-23', false, 40.50, '2024-01-19', 4),
  ('2024-01-26', true, 55.75, '2024-01-22', 5),
  ('2024-01-28', true, 30.99, '2024-01-24', 6);

-- Insert dummy data into Payment table for Customers
INSERT INTO Payment (payment_date, price, order_id)
VALUES 
  ('2024-01-21', 35.99, 1),
  ('2024-01-23', 20.75, 2),
  ('2024-01-26', 15.99, 3);

-- Insert dummy data into Payment table for Researchers
INSERT INTO Payment (payment_date, price, order_id)
VALUES 
  ('2024-01-24', 40.50, 4),
  ('2024-01-27', 55.75, 5),
  ('2024-01-29', 30.99, 6);

-- Insert dummy data into CartProduct table for Customers
INSERT INTO CartProduct (cart_id, medicine_id, chemical_id)
VALUES 
  (1, 1, 1),
  (2, 2, 2),
  (3, 3, 3);

-- Insert dummy data into CartProduct table for Researchers
INSERT INTO CartProduct (cart_id, medicine_id, chemical_id)
VALUES 
  (4, 1, 1),
  (5, 2, 2),
  (6, 3, 3);

-- Insert dummy data into DeliveryService table for Customers
INSERT INTO DeliveryService (order_id, delivery_service_name, phone, email, delivery_cost, address)
VALUES 
  (1, 'Express Delivery', '123-456-7890', 'express@example.com', 10.50, '123 Main Street'),
  (2, 'Standard Delivery', '987-654-3210', 'standard@example.com', 5.75, '456 Oak Avenue'),
  (3, 'Super Fast Delivery', '555-123-4567', 'superfast@example.com', 15.99, '789 Elm Boulevard');

-- Insert dummy data into Inventory table
INSERT INTO Inventory (medicine_id, chemical_id, stocked_amount, sold_amount)
VALUES 
  (1, 1, 100, 20),
  (2, 2, 50, 10),
  (3, 3, 200, 30);


-- Insert dummy data into InventoryLog table
INSERT INTO InventoryLog (manufacturer_id, medicine_id, chemical_id, log_date, added_quantity)
VALUES 
  (1, 1, 1, '2024-01-15', 50),
  (2, 2, 2, '2024-01-16', 30),
  (3, 3, 3, '2024-01-17', 40),
  (1, 1, 1, '2024-01-18', 25),
  (2, 2, 2, '2024-01-19', 20),
  (3, 3, 3, '2024-01-20', 15);



