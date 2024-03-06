CREATE OR REPLACE FUNCTION add_medicine_to_inventory()
RETURNS TRIGGER AS $$
DECLARE
BEGIN

    INSERT INTO Inventory (medicine_id, stocked_amount, sold_amount)
    VALUES (NEW.medicine_id, 0, 0);
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error adding medicine to Inventory table: %', SQLERRM USING ERRCODE = '50000';
        RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER add_medicine_trigger
AFTER ON medicine
FOR EACH ROW
EXECUTE FUNCTION add_medicine_to_inventory();
