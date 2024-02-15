CREATE OR REPLACE FUNCTION create_cart(USER_id uuid, is_customer BOOLEAN) 
RETURNS cart AS
$$
DECLARE
    c_row cart;
BEGIN
    IF is_customer THEN 
        INSERT INTO cart (iscustomer, customer_id, researcher_id)
        VALUES (TRUE, USER_id, NULL)
        RETURNING * INTO c_row;
    ELSE 
        INSERT INTO cart (iscustomer, customer_id, researcher_id)
        VALUES (FALSE, NULL, USER_id)
        RETURNING * INTO c_row;
    END IF;

    RETURN c_row;
END;
$$
LANGUAGE plpgsql;
