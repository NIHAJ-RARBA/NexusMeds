

CREATE OR REPLACE FUNCTION DELETE_ORDER() RETURNS TRIGGER AS $$
DECLARE
    USR_ID UUID;
BEGIN
    -- Check if the operation is DELETE
    IF TG_OP = 'DELETE' THEN
        -- If the status is already false, no need to insert into history
        IF OLD.status = false THEN
            RETURN OLD;
        END IF;

        SELECT CUSTOMER_ID INTO USR_ID FROM CART WHERE OLD.CART_ID = cart_id AND researcher_id IS NULL;

        IF USR_ID IS NULL THEN
            SELECT researcher_id INTO USR_ID FROM CART WHERE OLD.CART_ID = cart_id AND CUSTOMER_id IS NULL;
        END IF;

        -- Insert into ORDER_HISTORY
        INSERT INTO ORDER_HISTORY (shipment_date, status, price, order_date, cart_id, USER_ID)
        VALUES (OLD.shipment_date, OLD.status, OLD.price, OLD.order_date, OLD.cart_id, USR_ID);

        RETURN OLD;
    END IF;

    RETURN NULL; -- For other operations like INSERT or UPDATE
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER ORDER_DELETE_TRIGGER
    BEFORE DELETE ON ORDERS
    FOR EACH ROW
    EXECUTE FUNCTION DELETE_ORDER();
