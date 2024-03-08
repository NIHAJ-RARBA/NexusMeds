
import { text } from 'express';
import client from '../DB.js';

export const getAllCustomers = async (req, res) => {
    try {
        const result = await client.query('SELECT customer_id, customer_name, email, phone, address, billing_address, date_of_birth, gender, image, phone FROM customer');
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (error) {

        res.status(500).json({ error: error });
        console.log(error.message);
    }
}

export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await client.query("SELECT * FROM customer WHERE customer_id = $1", [id]);

        res.json(customer.rows[0]);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}


// used before. no longer in use


// export const createCustomer = async (req, res) => {
//     try {
//         const { email, phone, customer_name, date_of_birth, image, gender, address, billing_address } = req.body;

//         const newCustomer = await client.query(
//             "INSERT INTO customer (customer_id, email, phone, customer_name, date_of_birth, image, gender, address, billing_address) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
//             [email, phone, customer_name, date_of_birth, image, gender, address, billing_address]
//         );

//         res.json(newCustomer.rows[0]);
//         console.log(req.body);

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// };


export const getCustomerByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const customer = await client.query("SELECT * FROM customer WHERE email = $1", [email]);

        res.json(customer.rows[0]);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

export const updateCustomerByEmail = async (req, res) => {
    try {
        const { email, phone, customer_name, date_of_birth, image, gender, address, billing_address } = req.body;

        const updateCustomer = await client.query( "UPDATE customer SET phone = $1, customer_name = $2, date_of_birth = $3, image = $4, gender = $5, address = $6, billing_address = $7 WHERE email = $8 RETURNING *;",
            [phone, customer_name, date_of_birth, image, gender, address, billing_address, email]
        );

        res.json({ message: "User was updated", user: updateCustomer.rows[0] });

    } catch (error) {

        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteCustomerByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const deleteCustomer = await client.query("DELETE FROM customer WHERE email = $1", [email]);

        res.json({ message: "User was deleted" });

    } catch (error) {

        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getTotalSpentByCustomer = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;


        const query = "SELECT SUM(price)\
        FROM order_history\
        WHERE cart_id IN (SELECT cart_id FROM CART WHERE customer_id::text = $1 OR\
        researcher_id::text = $1)"

        const totalSpent = await client.query(query, [id])

        res.json(totalSpent.rows[0]);
        console.log(totalSpent.rows[0]);

    } catch (error) {

        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getPendingOrders = async (req, res) => {
    try {

        const { id } = req.body;
        console.log(req.body);

        console.log('id:', id );

        const query = "SELECT * \
        FROM orders\
        WHERE cart_id in (select cart_id from cart where customer_id = $1 and status = false)";

        const result = await client.query(query, [id]);
        res.status(200).json(result.rows);
        
        //console.log(result.rows);

    } catch (error) {

        res.status(500).json({ error: error });
        console.log(error.message);
    }
}

export const getOrderHistory = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(req.body);

        const query = "SELECT * \
        FROM order_history\
        WHERE user_id = $1";

        const result = await client.query(query, [id]);
        res.status(200).json(result.rows);
        
        //console.log(result.rows);

    } catch (error) {

        res.status(500).json({ error: error });
        console.log(error.message);
    }
}