CREATE OR REPLACE PROCEDURE DelayOrderShipment(order_id_param INTEGER, days_to_delay_param INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
    current_shipment_date DATE;
    new_shipment_date DATE;
BEGIN
    
    SELECT shipment_date INTO current_shipment_date
    FROM orders
    WHERE order_id = order_id_param;

    
    new_shipment_date := current_shipment_date + days_to_delay_param;

    
    UPDATE orders
    SET shipment_date = new_shipment_date
    WHERE order_id = order_id_param;

   
    RAISE NOTICE 'Order % shipment date updated to %', order_id_param, new_shipment_date;

END;
$$;
