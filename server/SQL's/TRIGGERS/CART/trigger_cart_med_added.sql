-- CREATE OR REPLACE FUNCTION CHECK_AVAILABILITY_OF_INVENTORY_MEDICINE()
-- RETURNS TRIGGER AS $$
-- DECLARE
--     v_error_code INTEGER;
--     updated_qty Inventory.stocked_amount%TYPE;

-- BEGIN
--     -- Check if the medicine_id exists in the Inventory
--     IF NOT EXISTS (SELECT 1 FROM Inventory WHERE medicine_id = NEW.medicine_id) THEN
--         v_error_code := 13877;
--         RAISE EXCEPTION 'Error Code: %', v_error_code;
--     END IF;

--     -- Determine the change in quantity
--     IF TG_OP = 'INSERT' THEN
--         updated_qty := NEW.quantity;
--     ELSE IF TG_OP = 'UPDATE' THEN
--         updated_qty := NEW.quantity - OLD.quantity;
--     END IF;
    
--     -- Check if stocked_amount is sufficient
--     IF (SELECT stocked_amount FROM Inventory WHERE medicine_id = NEW.medicine_id) < updated_qty THEN
--         v_error_code := 13878;
--         RAISE EXCEPTION 'Error Code: %', v_error_code;
--     ELSE
--         --Reduce stocked_amount by the change in quantity
--         UPDATE Inventory SET stocked_amount = stocked_amount - updated_qty
--         WHERE medicine_id = NEW.medicine_id;
--     END IF;

--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE TRIGGER cart_medicine_added
-- BEFORE INSERT OR UPDATE ON cartmedicine
-- FOR EACH ROW
-- EXECUTE FUNCTION CHECK_AVAILABILITY_OF_INVENTORY_MEDICINE();



-- ----drop ----
-- DROP FUNCTION IF EXISTS CHECK_AVAILABILITY_OF_INVENTORY_MEDICINE CASCADE;

-- DROP TRIGGER IF EXISTS cart_medicine_added ON cartmedicine;


CREATE OR REPLACE FUNCTION CHECK_AVAILABILITY_OF_INVENTORY_MEDICINE()
RETURNS TRIGGER AS $$
DECLARE
    v_error_code INTEGER;
BEGIN
    -- Check if the medicine_id exists in the Inventory
    IF NOT EXISTS (SELECT 1 FROM Inventory WHERE medicine_id = NEW.medicine_id) THEN
        v_error_code := 13877;
        RAISE EXCEPTION 'Error Code: %', v_error_code;
    END IF;

    -- Check if stocked_amount is sufficient
    IF (SELECT stocked_amount FROM Inventory WHERE medicine_id = NEW.medicine_id) < NEW.quantity THEN
        v_error_code := 13878;
        RAISE EXCEPTION 'Error Code: %', v_error_code;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER cart_medicine_added
BEFORE INSERT OR UPDATE ON cartmedicine
FOR EACH ROW
EXECUTE FUNCTION CHECK_AVAILABILITY_OF_INVENTORY_MEDICINE();

