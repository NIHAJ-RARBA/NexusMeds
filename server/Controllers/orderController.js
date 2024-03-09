import client from '../DB.js';

export const createOrder = async (req, res) => {

    try {

        const { user_id, price, billing_address, prescription } = req.body;
        

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

        // const order = await client.query
        //     ("SELECT * FROM orders\
        // WHERE cart_id = $1",
        //         [cart.rows[0].cart_id]);


        // if (order.rows.length > 0) {

        //     const temp = await client.query("DELETE FROM ORDERS WHERE ORDER_ID = $1", [order.rows[0].order_id]);

        //     const newOrder = await client.query
        //     ("INSERT INTO orders (cart_id, order_date, price,status, shipment_date,billing_address,prescription) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *",
        //         [cart.rows[0].cart_id, postgresqlFormattedDate, price, false, postgresqlFormattedFutureDate, billing_address,prescription]);

        //     return;
        // }


        console.log('amit is here');

        const newOrder = await client.query
            ("INSERT INTO orders (cart_id, order_date, price,status, shipment_date,billing_address,prescription) VALUES ($1,CURRENT_DATE, $2, $3,CURRENT_DATE+7,$4,$5) RETURNING *",
                [cart.rows[0].cart_id, price, false,  billing_address, prescription]);


        // const newOrder = await client.query(

        //     "INSERT INTO orders (cart_id, order_date, price,status, shipment_date) VALUES ($1, $2, $3, $4,$5) RETURNING *",
        //     [cart.rows[0].cart_id, order_date, order_total.rows[0].price, order_status, null ]

        // );

        await client.query(
            "CALL Populate_Payment($1, $2, $3)",
            [newOrder.rows[0].cart_id, price, postgresqlFormattedDate]
        );


        res.json(newOrder.rows[0]);
        console.log(newOrder.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

export const getOrdersWithPrescriptionNotNull = async (req, res) => {
    try {
        const orders = await client.query("SELECT * FROM orders WHERE prescription IS NOT NULL AND STATUS = FALSE");
        res.json(orders.rows);
    } catch (error) {
        console.log(error.message);
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await client.query("SELECT * FROM orders WHERE STATUS = FALSE");
        res.json(orders.rows);
    } catch (error) {
        console.log(error.message);
    }
}


export const setOrderStatus = async (req, res) => {
    try {
        const { order_id } = req.body;

        // Update the order status to TRUE (assuming status is a boolean column)
        const updateOrderQuery = "UPDATE orders SET status = TRUE WHERE order_id = $1 RETURNING *";
        const updatedOrder = await client.query(updateOrderQuery, [order_id]);

        console.log("Order updated:", updatedOrder.rows[0]);

        // Delete the order
        const deleteOrderQuery = "DELETE FROM orders WHERE order_id = $1 RETURNING *";
        const deletedOrder = await client.query(deleteOrderQuery, [order_id]);

        console.log("Order deleted:", deletedOrder.rows[0]);

        res.json({ message: "Order status updated and order deleted successfully" });
    } catch (error) {
        console.error("Error updating order status and deleting order:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};




export const deleteOrder = async (req, res) => {
    try {
        const { order_id } = req.body;
        const order = await client.query("DELETE FROM orders WHERE order_id = $1", [order_id]);
        res.json("Order was deleted");
    } catch (error) {
        console.log(error.message);
    }
}

export const delayOrder = async (req, res) => {
    try {
       
        const {order_id,days} = req.body;
        
        await client.query("CALL DelayOrderShipment($1, $2)", [order_id,days]);

        console.log(order_id, days);
        res.json("Order was delayed");
    }
    catch (error) {
        console.log(error.message);
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { order_id } = req.body;
        const order = await client.query("SELECT * FROM orders WHERE order_id = $1", [order_id]);
        res.json(order.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

export const checkOrderIfCustomerOrder = async (req, res) => {
    try {
        const { order_id } = req.body;

        let query = `SELECT 
        CASE
            WHEN EXISTS (
                SELECT 1
                FROM customer cus
                WHERE cus.customer_id = (
                    SELECT c.customer_id
                    FROM cart c
                    WHERE c.cart_id = (
                        SELECT o.cart_id
                        FROM orders o
                        WHERE o.order_id = $1
                    )
                )
            ) THEN true
            ELSE false
        END AS customer_order`;
        
        const order = await client.query(query, [order_id]);
        res.json(order.rows[0]);

        // console.log(order.rows[0]);

        
    } catch (error) {
        console.log(error.message);
    }
}
