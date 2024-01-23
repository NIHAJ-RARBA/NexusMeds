import client from '../DB.js';

export const createOrder = async (req, res) => {

    try {

        const { user_id } = req.body;
        const order_date = new Date();
        const order_status = false;
        let order_total = 0;

        const cart = await client.query
        ("SELECT * FROM cart\
        WHERE (customer_id = $1 OR researcher_id = $1) AND cart_status = false",
         [user_id]);


        if(cart.rows[0].isCustomer === true){

            order_total = await client.query
            ("SELECT T.price\
            FROM (SELECT cc.cart_id, sum(cc.quantity*C.PRICE) as price\
            FROM CARTMEDICINE CC JOIN MEDICINE C\
            ON CC.MEDICINE_ID = C.MEDICINE_id\
            GROUP BY cc.cart_id) T\
            JOIN CART ON CART.cart_id = T.cart_id AND CART.CUSTOMER_id = $1 AND CART.CART_STATUS = FALSE",
             [user_id]);
        }
        else{

            order_total = await client.query
            ("SELECT T.price\
            FROM (SELECT cc.cart_id, sum(cc.quantity*C.PRICE) as price\
            FROM CARTCHEMICAL CC JOIN chemical C\
            ON CC.chemical_ID = C.chemical_id\
            GROUP BY cc.cart_id) T\
            JOIN CART ON CART.cart_id = T.cart_id AND CART.researcher_id = $1 AND CART.CART_STATUS = FALSE",
             [user_id]);

        }

        const newOrder = await client.query(

            "INSERT INTO orders (cart_id, order_date, price,status, shipment_date) VALUES ($1, $2, $3, $4,$5) RETURNING *",
            [cart.rows[0].cart_id, order_date, order_total.rows[0].price, order_status, null ]

        );

        res.json(newOrder.rows[0]);
        console.log(newOrder.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}