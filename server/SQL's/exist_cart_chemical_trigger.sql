CREATE OR REPLACE FUNCTION check_cart_chemical()
RETURNS TRIGGER AS $$
DECLARE
    v_error_code INTEGER := 13423; 
BEGIN
    
    IF NOT EXISTS (SELECT 1 FROM Chemical WHERE chemical_id = NEW.chemical_id) THEN
        RAISE EXCEPTION 'Invalid chemical_id in the cart';
    END IF;
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        
        RAISE EXCEPTION 'error_code: %', v_error_code;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_cart_chemical_trigger
BEFORE INSERT OR UPDATE 
ON CartChemical
FOR EACH ROW
EXECUTE FUNCTION check_cart_chemical();
