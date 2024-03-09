-- Create a procedure to populate the Payment table when provided with order_id, price, and order_date
CREATE OR REPLACE PROCEDURE Populate_Payment(
    cart_id_param INTEGER,
    price_param NUMERIC(10,2),
    order_date_param DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Payment (payment_date, price, cart_id)
    VALUES (order_date_param, price_param, cart_id_param);
END;
$$;