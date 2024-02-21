CREATE OR REPLACE FUNCTION UPDATE_INVENTORY_forChemical_FUNCTION(Chem_ID inventory.chemical_id%TYPE, QTY INTEGER) RETURNS VARCHAR AS $$
DECLARE
    EX_CID inventory%ROWTYPE;
    Message VARCHAR;
BEGIN
   
    SELECT * INTO EX_CID FROM inventory WHERE chemical_id = Chem_ID;
    
    
    IF FOUND THEN
        UPDATE inventory
        SET stocked_amount = EX_CID.stocked_amount + QTY
        WHERE chemical_id = Chem_id;
        Message := 'Inventory updated.';
    ELSE
        
        INSERT INTO inventory (chemical_id, stocked_amount)
        VALUES (Chem_id, QTY);
        Message := 'New record inserted into inventory.';
    END IF;
    
    RETURN Message;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION UPDATE_INVENTORY_forChemical_FUNCTION_returns_trigger() RETURNS TRIGGER AS $$
BEGIN
    
    PERFORM UPDATE_INVENTORY_forChemical_FUNCTION(NEW.chemical_id, NEW.quantity);

    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER update_inventory_chemical
AFTER INSERT ON supplyrequestchemical
FOR EACH ROW
EXECUTE PROCEDURE UPDATE_INVENTORY_forChemical_FUNCTION_returns_trigger();