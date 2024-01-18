// const client = require('./DB.js');
import client from '../DB.js';

export const getAllMedicines = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM medicine');
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (error) {

        res.status(500).json({ error: error });
        console.log(error.message);
    }
};