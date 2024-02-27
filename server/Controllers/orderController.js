import client from '../DB.js';

export const createOrder = async (req, res) => {

    try {

        const { user_id, price, billing_address } = req.body;
        const order_date = new Date();
        const future_date = new Date(order_date);
        future_date.setDate(order_date.getDate() + 7);
        

        const postgresqlFormattedDate = order_date.toISOString().slice(0, 10); // YYYY-MM-DD
        const postgresqlFormattedFutureDate = future_date.toISOString().slice(0, 10); // YYYY-MM-DD

        //console.log(postgresqlFormattedDate);

        const order_status = false;
        // let order_total = 0;

        const cart = await client.query
            ("SELECT * FROM cart\
        WHERE (customer_id = $1 OR researcher_id = $1) AND cart_status = false",
                [user_id]);


        if (cart.rows[0].isCustomer === true) {

            // order_total = await client.query
            // ("SELECT T.price\
            // FROM (SELECT cc.cart_id, sum(cc.quantity*C.PRICE) as price\
            // FROM CARTMEDICINE CC JOIN MEDICINE C\
            // ON CC.MEDICINE_ID = C.MEDICINE_id\
            // GROUP BY cc.cart_id) T\
            // JOIN CART ON CART.cart_id = T.cart_id AND CART.CUSTOMER_id = $1 AND CART.CART_STATUS = FALSE",
            //  [user_id]);


        }
        else {

            // order_total = await client.query
            // ("SELECT T.price\
            // FROM (SELECT cc.cart_id, sum(cc.quantity*C.PRICE) as price\
            // FROM CARTCHEMICAL CC JOIN chemical C\
            // ON CC.chemical_ID = C.chemical_id\
            // GROUP BY cc.cart_id) T\
            // JOIN CART ON CART.cart_id = T.cart_id AND CART.researcher_id = $1 AND CART.CART_STATUS = FALSE",
            //  [user_id]);
        }

        //check if there is a order with the same cart_id, if so, get the order and if not , create a order

        const order = await client.query
            ("SELECT * FROM orders\
        WHERE cart_id = $1",
                [cart.rows[0].cart_id]);


        if (order.rows.length > 0) {

            const temp = await client.query("DELETE FROM ORDERS WHERE ORDER_ID = $1", [order.rows[0].order_id]);

            const newOrder = await client.query
            ("INSERT INTO orders (cart_id, order_date, price,status, shipment_date,billing_address) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *",
                [cart.rows[0].cart_id, postgresqlFormattedDate, price, false, postgresqlFormattedFutureDate, billing_address]);

            return;
        }

        const newOrder = await client.query
            ("INSERT INTO orders (cart_id, order_date, price,status, shipment_date,billing_address) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *",
                [cart.rows[0].cart_id, postgresqlFormattedDate, price, false, postgresqlFormattedFutureDate, billing_address]);


        // const newOrder = await client.query(

        //     "INSERT INTO orders (cart_id, order_date, price,status, shipment_date) VALUES ($1, $2, $3, $4,$5) RETURNING *",
        //     [cart.rows[0].cart_id, order_date, order_total.rows[0].price, order_status, null ]

        // );

        res.json(newOrder.rows[0]);
        console.log(newOrder.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}