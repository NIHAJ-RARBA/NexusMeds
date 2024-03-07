CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- add extension for generating uuid
CREATE DATABASE nexusmeds;

CREATE TABLE Manufacturer(
    manufacturer_id SERIAL PRIMARY KEY,
    manufacturer_name TEXT NOT NULL,
    email VARCHAR(100) NOT NULL,
    address TEXT
);

CREATE TABLE medicine(
    medicine_id SERIAL PRIMARY KEY,
    med_name TEXT NOT NULL,
    price NUMERIC(6,3) NOT NULL,
    image TEXT,
    generic_name TEXT,
    package_type VARCHAR(100),
    med_form VARCHAR(50),
    isOTC BOOLEAN,
    manufacturer_id INTEGER REFERENCES Manufacturer(manufacturer_id) ON DELETE CASCADE NOT NULL,
    indication TEXT,
    dosage TEXT,
    dosageStrength NUMERIC(4,0),
    cautions TEXT
);

CREATE TABLE Chemical(
    chemical_id SERIAL PRIMARY KEY,
    chem_name TEXT NOT NULL,
    image TEXT,
    iupac_name VARCHAR(200),
    manufacturer_id INTEGER REFERENCES Manufacturer(manufacturer_id) ON DELETE CASCADE NOT NULL,
    parent_chemical_id INTEGER REFERENCES Chemical(chemical_id) ON DELETE SET NULL,
    chemical_formula TEXT,
    description TEXT,
    molecular_weight NUMERIC(6,3),
    price NUMERIC(6,3) NOT NULL
);

CREATE TABLE Customer (
    customer_id UUID PRIMARY KEY DEFAULT UUID_generate_v4(),
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    date_of_birth DATE,
    image TEXT,
    gender BOOLEAN,
    address TEXT,
    billing_address TEXT
);

CREATE TABLE Researcher (
    researcher_id UUID PRIMARY KEY DEFAULT UUID_generate_v4(),
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password TEXT NOT NULL,
    researcher_name TEXT NOT NULL,
    date_of_birth DATE,
    image TEXT,
    gender BOOLEAN,
    address TEXT,
    billing_address TEXT,
    isApproved BOOLEAN
);

CREATE TABLE MedicineChemical (
    medicine_id INTEGER REFERENCES medicine(medicine_id) ON DELETE CASCADE,
    chemical_id INTEGER REFERENCES Chemical(chemical_id) ON DELETE CASCADE,
    purpose TEXT,
    PRIMARY KEY (medicine_id, chemical_id)
);

CREATE TABLE Cart (
    cart_id SERIAL PRIMARY KEY,
    isCustomer BOOLEAN,
    customer_id UUID REFERENCES Customer(customer_id) ON DELETE CASCADE,
    researcher_id UUID REFERENCES Researcher(researcher_id) ON DELETE CASCADE,
    cart_status BOOLEAN DEFAULT false
);

CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    shipment_date DATE,
    status BOOLEAN,
    price NUMERIC(6,3),
    order_date DATE,
    cart_id INTEGER REFERENCES Cart(cart_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE Payment (
    payment_id SERIAL PRIMARY KEY,
    payment_date DATE,
    price NUMERIC(8,2),
    order_id INTEGER REFERENCES Orders(order_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE CartMedicine (
    cart_id INTEGER REFERENCES Cart(cart_id) ON DELETE CASCADE,
    medicine_id INTEGER REFERENCES medicine(medicine_id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0,
    PRIMARY KEY (cart_id, medicine_id)
);

CREATE TABLE CartChemical (
    cart_id INTEGER REFERENCES Cart(cart_id) ON DELETE CASCADE,
    chemical_id INTEGER REFERENCES chemical(chemical_id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0,
    PRIMARY KEY (cart_id, chemical_id)
);

CREATE TABLE DeliveryService (
    delivery_service_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES Orders(order_id) ON DELETE CASCADE,
    delivery_service_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) NOT NULL,
    delivery_cost NUMERIC(6,3),
    address TEXT
);

CREATE TABLE Inventory (
    medicine_id INTEGER REFERENCES medicine(medicine_id) ON DELETE CASCADE,
    chemical_id INTEGER REFERENCES Chemical(chemical_id) ON DELETE CASCADE,
    stocked_amount NUMERIC(5,0),
    sold_amount NUMERIC(5,0),
    PRIMARY KEY (medicine_id, chemical_id)
);

CREATE TABLE InventoryLog (
    log_id SERIAL PRIMARY KEY,
    manufacturer_id INTEGER REFERENCES Manufacturer(manufacturer_id) ON DELETE SET NULL,
    medicine_id INTEGER REFERENCES medicine(medicine_id) ON DELETE SET NULL,
    chemical_id INTEGER REFERENCES Chemical(chemical_id) ON DELETE SET NULL,
    log_date DATE,
    added_quantity NUMERIC(5,0)
);

CREATE TABLE Admins (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(500) NOT NULL
);



---- new added 20 feb ----

--in invetory table add pk inventory_id serial primary key and drop the present primary key



DROP TABLE Inventory;

-- IN INVENTORY TABLE MEDICINE ID OR CHEMICAL ID CAN BE NULL

CREATE TABLE Inventory (
    inventory_id SERIAL PRIMARY KEY,
    medicine_id INTEGER REFERENCES medicine(medicine_id) ON DELETE CASCADE,
    chemical_id INTEGER REFERENCES Chemical(chemical_id) ON DELETE CASCADE,
    stocked_amount NUMERIC(5,0),
    sold_amount NUMERIC(5,0)
);



---- ADDED CASADE FOR SUPPLY REQUEST TABLES ----

DROP TABLE SupplyRequestChemical;
DROP TABLE SupplyRequestMedicine;

CREATE TABLE SupplyRequestMedicine (

    request_id SERIAL PRIMARY KEY,
    medicine_id INTEGER REFERENCES medicine(medicine_id) ON DELETE CASCADE,
    quantity INTEGER,
    request_date DATE
); 

CREATE TABLE SupplyRequestChemical (

    request_id SERIAL PRIMARY KEY,
    chemical_id INTEGER REFERENCES chemical(chemical_id) ON DELETE CASCADE,
    quantity INTEGER,
    request_date DATE
);


--- NEW ALTERS ADDED ON 27 FEB 2024 ---

CREATE TABLE prescription (
    customer_id UUID PRIMARY KEY REFERENCES customer(customer_id) ON DELETE CASCADE,
    filedata BYTEA,
    status BOOLEAN
);

ALTER TABLE ORDERS ADD COLUMN BILLING_ADDRESS TEXT;

CREATE TABLE ORDER_HISTORY (
    ORDER_HISTORY_ID SERIAL PRIMARY KEY,
    shipment_date DATE,
    status BOOLEAN,
    price NUMERIC(6,3),
    order_date DATE,
    cart_id INTEGER REFERENCES Cart(cart_id) ON DELETE SET NULL NOT NULL,
    USER_ID UUID
);


CREATE OR REPLACE FUNCTION DELETE_ORDER() RETURNS TRIGGER AS $$
DECLARE
    USR_ID UUID;
BEGIN
    -- Check if the operation is DELETE
    IF TG_OP = 'DELETE' THEN
        -- If the status is already false, no need to insert into history
        IF OLD.status = false THEN
            RETURN OLD;
        END IF;

        SELECT CUSTOMER_ID INTO USR_ID FROM CART WHERE OLD.CART_ID = cart_id AND researcher_id IS NULL;

        IF USR_ID IS NULL THEN
            SELECT researcher_id INTO USR_ID FROM CART WHERE OLD.CART_ID = cart_id AND CUSTOMER_id IS NULL;
        END IF;

        -- Insert into ORDER_HISTORY
        INSERT INTO ORDER_HISTORY (shipment_date, status, price, order_date, cart_id, USER_ID)
        VALUES (OLD.shipment_date, OLD.status, OLD.price, OLD.order_date, OLD.cart_id, USR_ID);

        RETURN OLD;
    END IF;

    RETURN NULL; -- For other operations like INSERT or UPDATE
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER ORDER_DELETE_TRIGGER
    BEFORE DELETE ON ORDERS
    FOR EACH ROW
    EXECUTE FUNCTION DELETE_ORDER();


---- added 28 feb 2024 ----

DROP TABLE prescription;

ALTER TABLE ORDERS ADD COLUMN prescription bytea;


-- by abrur
CREATE TABLE PENDING_APPROVALS (
    researcher_id UUID PRIMARY KEY,
    photo TEXT,
    FOREIGN KEY (researcher_id) REFERENCES Researcher(researcher_id)
);


ALTER TABLE ORDERS DROP COLUMN prescription;
ALTER TABLE ORDERS ADD COLUMN prescription TEXT;


-----Alters added 7 march ------


ALTER TABLE Orders
    ALTER COLUMN price TYPE NUMERIC(10,2);
ALTER TABLE ORDER_HISTORY
    ALTER COLUMN price TYPE NUMERIC(10,2);


---- added 8 march 2024 ----
CREATE TABLE LOGIN_LOG(
    log_id SERIAL PRIMARY KEY,
    user_id UUID,
    login_time DATE,
    logout_time DATE
);
