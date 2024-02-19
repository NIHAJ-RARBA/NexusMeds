CREATE OR REPLACE FUNCTION check_name_format()
RETURNS TRIGGER AS
$$
DECLARE
    v_valid_name VARCHAR(200);
    v_error_code INTEGER := 12345; 
BEGIN
   
    v_valid_name := initcap(lower(NEW.customer_name));
    
    
    IF v_valid_name ~ '^[a-zA-Z ]+$' THEN
        
        NEW.customer_name := v_valid_name;
        RETURN NEW; 
    ELSE
        
        RAISE EXCEPTION 'Name should contain only alphabetic characters';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        
        RAISE EXCEPTION 'error_code: %', v_error_code; 
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER check_name_format_trigger
BEFORE INSERT OR UPDATE 
OF customer_name 
ON customer
FOR EACH ROW
EXECUTE FUNCTION check_name_format();
