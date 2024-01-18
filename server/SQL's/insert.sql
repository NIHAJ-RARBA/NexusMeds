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

-- Insert dummy data into Customer table
INSERT INTO Customer (email, phone, customer_name, date_of_birth, image, gender, address, billing_address)
VALUES 
  ('john.doe@example.com', '123-456-7890', 'John Doe', '1990-05-15', 'john_image.jpg', true, '123 Main Street', 'Billing Street 1'),
  ('jane.smith@example.com', '987-654-3210', 'Jane Smith', '1985-08-22', 'jane_image.jpg', false, '456 Oak Avenue', 'Billing Street 2'),
  ('bob.johnson@example.com', '555-123-4567', 'Bob Johnson', '1978-12-10', 'bob_image.jpg', true, '789 Elm Boulevard', 'Billing Street 3'),
  ('alice.williams@example.com', '111-222-3333', 'Alice Williams', '1995-03-03', 'alice_image.jpg', false, '999 Pine Lane', 'Billing Street 4');
