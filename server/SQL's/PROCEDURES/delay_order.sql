CREATE OR REPLACE PROCEDURE DelayOrderShipment(order_id_param INTEGER, days_to_delay_param INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
    current_shipment_date DATE;
    new_shipment_date DATE;
BEGIN
    -- Get the current shipment_date of the order
    SELECT shipment_date INTO current_shipment_date
    FROM orders
    WHERE order_id = order_id_param;

    -- Calculate the new shipment_date by adding days_to_delay_param to the current shipment_date
    new_shipment_date := current_shipment_date + days_to_delay_param;

    -- Update the order with the new shipment_date
    UPDATE orders
    SET shipment_date = new_shipment_date
    WHERE order_id = order_id_param;

    -- Optionally, you can add additional logic or checks here

    -- Return a message indicating the update was successful
    RAISE NOTICE 'Order % shipment date updated to %', order_id_param, new_shipment_date;

END;
$$;
