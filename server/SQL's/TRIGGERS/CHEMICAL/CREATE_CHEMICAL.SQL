CREATE OR REPLACE FUNCTION add_chemical_to_inventory()
RETURNS TRIGGER AS $$
DECLARE
BEGIN

    INSERT INTO Inventory (chemical_id, stocked_amount, sold_amount)
    VALUES (NEW.chemical_id, 0, 0);
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error adding chemical to Inventory table: %', SQLERRM USING ERRCODE = '50000';
        RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER add_chemical_trigger
AFTER INSERT ON chemical
FOR EACH ROW
EXECUTE FUNCTION add_chemical_to_inventory();
