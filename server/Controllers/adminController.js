import {create} from 'domain';
import client from '../DB.js';

export const getstats = async (req, res) => {
    try {
        const user = await client.query("SELECT * from researchers");
        const user2 = await client.query("SELECT * from customers");
        const user3 = await client.query("SELECT * from admins");
        const user4 = await client.query("SELECT * from permits");
        res.json({researchers: user.rows.length, customers: user2.rows.length, admins: user3.rows.length, permits: user4.rows.length});
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
}