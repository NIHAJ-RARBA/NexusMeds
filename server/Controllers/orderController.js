import client from '../DB.js';

export const createOrder = async (req, res) => {

    try {
        const { user_id } = req.body;

        const sql = ''

        const cartId = await client.query("SELECT cart_id FROM cart WHERE user_id = $1", [user_id]);

        const newOrder = await client.query(

            "INSERT INTO orders (user_id, order_date, order_status, order_total) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_id, order_date, order_status, order_total]

        );

        res.json(newOrder.rows[0]);
        console.log(newOrder.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}