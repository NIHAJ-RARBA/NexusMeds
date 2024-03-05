CREATE OR REPLACE FUNCTION UPDATE_INVENTORY_FUNCTION(MID inventory.medicine_id%TYPE, QTY INTEGER) RETURNS VARCHAR AS $$
DECLARE
    EX_MID inventory%ROWTYPE;
    Message VARCHAR;
BEGIN
    
    SELECT * INTO EX_MID FROM inventory WHERE medicine_id = MID;
    
    
    IF FOUND THEN
        UPDATE inventory
        SET stocked_amount = EX_MID.stocked_amount + QTY
        WHERE medicine_id = MID;
        Message := 'Inventory updated.';
    ELSE
        
        INSERT INTO inventory (medicine_id, stocked_amount,sold_amount)
        VALUES (MID, QTY);
        Message := 'New record inserted into inventory.';
    END IF;
    
    RETURN Message;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION UPDATE_INVENTORY_FUNCTION_returns_trigger() RETURNS TRIGGER AS $$
BEGIN
    
    PERFORM UPDATE_INVENTORY_FUNCTION(NEW.medicine_id, NEW.quantity);

    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER update_inventory_medicine
AFTER INSERT ON supplyrequestmedicine
FOR EACH ROW
EXECUTE PROCEDURE UPDATE_INVENTORY_FUNCTION_returns_trigger();