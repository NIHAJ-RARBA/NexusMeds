

-- CREATE OR REPLACE FUNCTION DELETE_ORDER() RETURNS TRIGGER AS $$
-- DECLARE
--     USR_ID UUID;
-- BEGIN
--     -- Check if the operation is DELETE
--     IF TG_OP = 'DELETE' THEN
--         -- If the status is already false, no need to insert into history
--         IF OLD.status = false THEN
--             RETURN OLD;
--         END IF;

--         SELECT CUSTOMER_ID INTO USR_ID FROM CART WHERE OLD.CART_ID = cart_id AND researcher_id IS NULL;

--         IF USR_ID IS NULL THEN
--             SELECT researcher_id INTO USR_ID FROM CART WHERE OLD.CART_ID = cart_id AND CUSTOMER_id IS NULL;
--         END IF;

--         -- Insert into ORDER_HISTORY
--         INSERT INTO ORDER_HISTORY (shipment_date, status, price, order_date, cart_id, USER_ID)
--         VALUES (OLD.shipment_date, OLD.status, OLD.price, OLD.order_date, OLD.cart_id, USR_ID);

--         RETURN OLD;
--     END IF;

--     RETURN NULL; -- For other operations like INSERT or UPDATE
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE TRIGGER ORDER_DELETE_TRIGGER
--     BEFORE DELETE ON ORDERS
--     FOR EACH ROW
--     EXECUTE FUNCTION DELETE_ORDER();



---------------------------------------------------


CREATE OR REPLACE FUNCTION DELETE_ORDER() RETURNS TRIGGER AS $$
DECLARE
    USR_ID UUID;
    PRODUCT_ID INTEGER;
    QTY INTEGER;
BEGIN
    -- Check if the operation is DELETE
    IF TG_OP = 'DELETE' THEN
        -- If the status is already false, no need to insert into history

        SELECT CUSTOMER_ID INTO USR_ID FROM CART WHERE OLD.CART_ID = cart_id AND researcher_id IS NULL;

        IF USR_ID IS NULL THEN
            SELECT researcher_id INTO USR_ID FROM CART WHERE OLD.CART_ID = cart_id AND CUSTOMER_id IS NULL;
            
            IF OLD.status = false THEN
                FOR PRODUCT_ID, QTY IN SELECT CHEMICAL_ID, QUANTITY FROM cartchemical WHERE cart_id = OLD.cart_id
                LOOP
                    UPDATE inventory SET stocked_amount = stocked_amount + QTY WHERE chemical_id = PRODUCT_ID;
                END LOOP;
                RETURN OLD;
            ELSE
                FOR PRODUCT_ID, QTY IN SELECT CHEMICAL_ID, QUANTITY FROM cartchemical WHERE cart_id = OLD.cart_id
                LOOP
                    UPDATE inventory SET sold_amount = sold_amount + QTY WHERE chemical_id = PRODUCT_ID;
                END LOOP;
            END IF;
        ELSE
            IF OLD.status = false THEN
                FOR PRODUCT_ID, QTY IN SELECT MEDICINE_ID, QUANTITY FROM cartMEDICINE WHERE cart_id = OLD.cart_id
                LOOP
                    UPDATE inventory SET stocked_amount = stocked_amount + QTY WHERE MEDICINE_id = PRODUCT_ID;
                END LOOP;
                RETURN OLD;
            ELSE
                FOR PRODUCT_ID, QTY IN SELECT MEDICINE_ID, QUANTITY FROM cartMEDICINE WHERE cart_id = OLD.cart_id
                LOOP
                    UPDATE inventory SET sold_amount = sold_amount + QTY WHERE MEDICINE_id = PRODUCT_ID;
                END LOOP;
            END IF;
        END IF;

        -- Insert into ORDER_HISTORY
        INSERT INTO ORDER_HISTORY (shipment_date, status, price, order_date, cart_id, USER_ID)
        VALUES (OLD.shipment_date, OLD.status, OLD.price, OLD.order_date, OLD.cart_id, USR_ID);

        RETURN OLD;
    END IF;

    RETURN NULL; -- For other operations like INSERT or UPDATE
END;
$$ LANGUAGE plpgsql;

-- CREATE OR REPLACE TRIGGER ORDER_DELETE_TRIGGER
--     BEFORE DELETE ON ORDERS
--     FOR EACH ROW
--     EXECUTE FUNCTION DELETE_ORDER();

