-- CREATE OR REPLACE FUNCTION CHECK_AVAILABILITY_OF_INVENTORY_CHEM()
-- RETURNS TRIGGER AS $$
-- DECLARE
--     v_error_code INTEGER;
--     updated_qty Inventory.stocked_amount%TYPE;
-- BEGIN
--     -- Check if the chemical_id exists in the Inventory
--     IF NOT EXISTS (SELECT 1 FROM Inventory WHERE chemical_id = NEW.chemical_id) THEN
--         v_error_code := 13890;
--         RAISE EXCEPTION 'Error Code: %', v_error_code;
--     END IF;

--     -- Determine the change in quantity
--     IF TG_OP = 'INSERT' THEN
--         updated_qty := NEW.quantity;
--     ELSIF TG_OP = 'UPDATE' THEN
--         updated_qty := NEW.quantity - OLD.quantity;
--     END IF;
    
--     -- Check if stocked_amount is sufficient
--     IF (SELECT stocked_amount FROM Inventory WHERE chemical_id = NEW.chemical_id) < updated_qty THEN
--         v_error_code := 13891;
--         RAISE EXCEPTION 'Error Code: %', v_error_code;
--     ELSE
--         -- Reduce stocked_amount by the change in quantity
--         UPDATE Inventory SET stocked_amount = stocked_amount - updated_qty
--         WHERE chemical_id = NEW.chemical_id;
--     END IF;

--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE TRIGGER cart_CHEMICAL_added
-- BEFORE INSERT OR UPDATE ON cartchemical
-- FOR EACH ROW
-- EXECUTE FUNCTION CHECK_AVAILABILITY_OF_INVENTORY_CHEM();


CREATE OR REPLACE FUNCTION CHECK_AVAILABILITY_OF_INVENTORY_CHEM()
RETURNS TRIGGER AS $$
DECLARE
    v_error_code INTEGER;
BEGIN
    -- Check if the CHEMICAL_id exists in the Inventory
    IF NOT EXISTS (SELECT 1 FROM Inventory WHERE CHEMICAL_id = NEW.CHEMICAL_id) THEN
        v_error_code := 13890;
        RAISE EXCEPTION 'Error Code: %', v_error_code;
    END IF;

    -- Check if stocked_amount is sufficient
    IF (SELECT stocked_amount FROM Inventory WHERE CHEMICAL_id = NEW.CHEMICAL_id) < NEW.quantity THEN
        v_error_code := 13891;
        RAISE EXCEPTION 'Error Code: %', v_error_code;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER cart_CHEMICAL_added
BEFORE INSERT OR UPDATE ON cartCHEMICAL
FOR EACH ROW
EXECUTE FUNCTION CHECK_AVAILABILITY_OF_INVENTORY_CHEM();


