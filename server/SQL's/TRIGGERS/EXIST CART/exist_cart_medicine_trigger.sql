CREATE OR REPLACE FUNCTION check_cart_medicine()
RETURNS TRIGGER AS $$
DECLARE
v_error_code INTEGER := 13422;
BEGIN
    
    IF NOT EXISTS (SELECT 1 FROM medicine WHERE medicine_id = NEW.medicine_id) THEN
        RAISE EXCEPTION 'Invalid medicine_id in the cart';
    END IF;
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        
        RAISE EXCEPTION 'error_code: %', v_error_code; 
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_cart_medicine_trigger
BEFORE INSERT OR UPDATE 
ON CartMedicine
FOR EACH ROW
EXECUTE FUNCTION check_cart_medicine();
