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


