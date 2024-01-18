
import client from '../DB.js';

export const getAllUsers = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM customer');
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (error) {

        res.status(500).json({ error: error });
        console.log(error.message);
    }
}

