CREATE OR REPLACE FUNCTION checkInventory(o_id INTEGER, isCustomer BOOLEAN)
RETURNS TABLE (
    product_id INTEGER,
    product_quantity INTEGER,
    stock_amnt INTEGER,
    v_error_code INTEGER
) AS $$
DECLARE
    product RECORD;
BEGIN
    FOR product IN
        SELECT
            CASE
                WHEN isCustomer THEN cm.medicine_id
                ELSE cc.chemical_id
            END AS product_id,
            CASE
                WHEN isCustomer THEN cm.quantity
                ELSE cc.quantity
            END AS product_quantity
        FROM
            ORDERS O
            LEFT JOIN CARTMEDICINE CM ON O.CART_ID = CM.CART_ID
            LEFT JOIN CARTCHEMICAL CC ON O.CART_ID = CC.CART_ID
        WHERE
            O.order_id = o_id
    LOOP
        IF isCustomer THEN
            
            SELECT stocked_amount INTO stock_amnt
            FROM inventory
            WHERE medicine_id = product.product_id;
        ELSE
            
            SELECT stocked_amount INTO stock_amnt
            FROM inventory
            WHERE chemical_id = product.product_id;
        END IF;

        IF stock_amnt < product.product_quantity THEN
            v_error_code := 56789;
            RAISE EXCEPTION 'Error Code: %', v_error_code;
        ELSE
            
            RETURN NEXT;
        END IF;
    END LOOP;

    
    RETURN;
END;
$$ LANGUAGE plpgsql;