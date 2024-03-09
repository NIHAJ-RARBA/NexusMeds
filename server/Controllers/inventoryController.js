import client from '../DB.js';


export const getInventoryByMedicineId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM Inventory WHERE medicine_id = $1', [id]);
        
        console.log(result.rows[0]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
}

export const getInventoryByChemicalId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM Inventory WHERE chemical_id = $1', [id]);
        
        console.log(result.rows[0]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
}

export const getProductsInventory = async (req,res) =>{

    try{

        const {isMedicine} = req.body;
        
        const MED = "SELECT * FROM INVENTORY I JOIN MEDICINE M ON I.medicine_id = M.medicine_id WHERE I.MEDICINE_ID IS NOT NULL ORDER BY STOCKED_AMOUNT" ;
        const CHEM = "SELECT * FROM INVENTORY I JOIN CHEMICAL C ON I.CHEMICAL_ID = C.CHEMICAL_ID WHERE I.chemical_ID IS NOT NULL ORDER BY STOCKED_AMOUNT";

        if(isMedicine){
            const result = await client.query(MED);
            res.status(200).json(result.rows);
        }
        else{
            const result = await client.query(CHEM);
            res.status(200).json(result.rows);
        }

        console.log(isMedicine);


    }catch(error){


    }
    
}


export const checkAvailability = async (req, res) => {
    try {
        const { order_id, myCustomer } = req.body;

        console.log('amit is here');
        console.log(order_id, myCustomer);
        const result = await client.query("SELECT * FROM checkInventory($1,$2)", [order_id, myCustomer]);

        console.log(result.rows);
        res.status(200).json({ message: 'Inventory checked successfully' });

    } catch (error) {
        
        console.log(error.message);
        
        if (error.message.includes('56789')) {

            console.log('Inventory error: 56789');
            return res.status(400).json({ error: '56789' });

        }
    }
}




