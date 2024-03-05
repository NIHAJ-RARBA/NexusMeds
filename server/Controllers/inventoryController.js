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




