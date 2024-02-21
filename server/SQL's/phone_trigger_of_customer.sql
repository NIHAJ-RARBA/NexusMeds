CREATE OR REPLACE FUNCTION check_phone_format()
RETURNS TRIGGER AS
$$
DECLARE
    v_error_code INTEGER := 12346; 
BEGIN
    IF NEW.phone ~ '^[0-9]*$' AND NEW.phone <> '' THEN
        RETURN NEW;
    ELSE
        RAISE EXCEPTION 'Phone number should contain only numeric characters';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'error_code: %', v_error_code; 
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_phone_format_trigger
BEFORE INSERT OR UPDATE 
OF phone 
ON customer
FOR EACH ROW
EXECUTE FUNCTION check_phone_format();
