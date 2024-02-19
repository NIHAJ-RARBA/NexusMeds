CREATE OR REPLACE FUNCTION check_name_format()
RETURNS TRIGGER AS
$$
DECLARE
    v_valid_name VARCHAR(200); -- Adjust the size according to your needs
    v_error_code INTEGER := 12345; -- Custom error code
BEGIN
    -- Convert the new name to lowercase and capitalize the first letter of each word
    v_valid_name := initcap(lower(NEW.customer_name));
    
    -- Check if the new name contains only alphabetic characters
    IF v_valid_name ~ '^[a-zA-Z ]+$' THEN
        -- Name is valid
        NEW.customer_name := v_valid_name;
        RETURN NEW; -- Return the new row
    ELSE
        -- Name contains special characters or digits
        RAISE EXCEPTION 'Name should contain only alphabetic characters';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- Log or handle the exception as per your requirement
        RAISE EXCEPTION 'error_code: %', v_error_code; -- Raise custom error code if an exception occurs
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER check_name_format_trigger
BEFORE INSERT OR UPDATE 
OF customer_name 
ON customer
FOR EACH ROW
EXECUTE FUNCTION check_name_format();
