import { create } from 'domain';
import client from '../DB.js';



export const addToCart = async (req, res) => {

    try {
        const { user_id, product_id, quantity } = req.body;
        let isCustomer;

        let cart = await client.query(
            'SELECT *\
            FROM CART\
            WHERE cart_id = (\
                SELECT cart_id\
                FROM cart\
                WHERE (customer_id = $1 OR researcher_id = $1)\
                    AND cart_status = false\
            )',
            [user_id]
        );

        const Customer = await client.query(
            'SELECT * FROM CUSTOMER WHERE customer_id = $1',
            [user_id]
        );

        isCustomer = Customer.rows.length > 0 ? true : false;

        
        if (cart.rows.length === 0) {

            console.log('inside create cart');


            console.log('user_id ', user_id);

            //create cart is function
            cart = await client.query('SELECT * FROM create_cart($1, $2)', [user_id, isCustomer]);
            console.log(cart);

            console.log('cart created');
        }

        console.log(cart.rows[0].cart_id);


        // if(cart.rows[0].iscustomer===true){

        //     isCustomer  = true;
        // }else{

        //     isCustomer = false;
        // }


        //let existCart = carts.rows.length > 0 ? true : false;

        console.log('cart is there : ' + cart.rows[0].cart_id);

        if (isCustomer === true) {

            console.log("cart_id : " + cart.rows[0].cart_id);

            const cartMedicines = await client.query(
                'SELECT * FROM cartMedicine WHERE cart_id = $1',
                [cart.rows[0].cart_id]
            );

            for (const cartMedicine of cartMedicines.rows) {
                

                if (parseInt(cartMedicine.medicine_id) === parseInt(product_id)) {

                    const updateCart = await client.query(
                        'UPDATE cartMedicine SET quantity = quantity + $1 WHERE cart_id = $2 AND medicine_id = $3 returning *',
                        [quantity, cartMedicine.cart_id, product_id]
                    );

                    res.json(updateCart.rows[0]);
                    console.log(updateCart.rows[0]);
                    return;
                }
            }

            console.log('CART NOT THERE for the product');
            // console.log(cart.rows[0].cart_id);
            //console.log("amit");

            const newCart = await client.query(

                'INSERT INTO cartmedicine (cart_id, medicine_id, quantity) VALUES ($1, $2, $3) RETURNING *',
                [cart.rows[0].cart_id, product_id, quantity]
            );


            res.json(newCart.rows[0]);
            console.log(newCart.rows[0]);

            return;
        }
        else if (isCustomer === false) {

            console.log('not customer');

            const cartChemicals = await client.query(
                'SELECT * FROM cartChemical WHERE cart_id = $1',
                [cart.rows[0].cart_id]
            );
            
        

                
            for (const cartChemical of cartChemicals.rows) {

            
                if (parseInt(cartChemical.chemical_id) === parseInt(product_id)) {

                    console.log('cart is there for the product ');

                    const updateCart = await client.query(
                        'UPDATE cartChemical SET quantity = quantity + $1 WHERE cart_id = $2 AND Chemical_id = $3 returning *',
                        [quantity, cartChemical.cart_id, product_id]
                    );



                    res.json(updateCart.rows[0]);
                    console.log(updateCart.rows[0]);
                    return;
                }
            }

            console.log('cart not there for the product ');


            const newCart = await client.query(
                'INSERT INTO cartChemical (cart_id, chemical_id, quantity) VALUES ($1, $2, $3) RETURNING *',
                [cart.rows[0].cart_id, product_id, quantity]
            );

            res.json(newCart.rows[0]);
            console.log(newCart.rows[0]);
            return;
        }


    } catch (error) {
        console.log(error.message);

        if (error.message.includes('13878')) {

            console.log('Inventory error: 13878');
            return res.status(400).json({ error: '13878' });

        }else if (error.message.includes('13891')) {

            console.log('Inventory error: 13891');
            return res.status(400).json({ error: '13891' });

        }
    }
}



export const removeFromCart = async (req, res) => {

    console.log(res.body);
    try {
        const { user_id, product_id, quantity } = req.body;

        const cart = await client.query(
            'SELECT * FROM CART WHERE cart_id = (\
                SELECT cart_id FROM cart \
                WHERE (customer_id = $1 OR researcher_id = $1) \
                    AND cart_status = false\
            )',
            [user_id]
        );

        console.log(cart.rows[0].cart_id);

        let isCustomer;

        if (cart.rows.length > 0) {
            isCustomer = cart.rows[0].iscustomer === true;
        } else {
            isCustomer = false;
        }

        if (isCustomer === true) {
            const cartMedicines = await client.query(
                'SELECT * FROM cartMedicine WHERE cart_id = $1',
                [cart.rows[0].cart_id]
            );

            for (const cartMedicine of cartMedicines.rows) {
                
                if (cartMedicine.medicine_id === product_id) {

                    const updateCart = await client.query(
                        'UPDATE cartMedicine SET quantity = quantity - $3 WHERE cart_id = $1 AND medicine_id = $2 returning *',
                        [cartMedicine.cart_id, product_id, quantity]
                    );

                    if (updateCart.rows[0].quantity <= 0) {
                        
                        const deleteCart = await client.query(
                            'DELETE FROM cartMedicine WHERE cart_id = $1 AND medicine_id = $2',
                            [cartMedicine.cart_id, product_id]
                        );

                        res.json(deleteCart.rows[0]);
                        console.log(deleteCart.rows[0]);
                        return;
                    }


                    res.json(updateCart.rows[0]);
                    console.log(updateCart.rows[0]);
                    return;
                }
            }

            //console.log('product not in cart');

        } else if (isCustomer === false) {

            const cartChemicals = await client.query(
                'SELECT * FROM cartChemical WHERE cart_id = $1',
                [cart.rows[0].cart_id]
            );

            for (const cartChemical of cartChemicals.rows) {
                if (cartChemical.chemical_id === product_id) {

                    const updateCart = await client.query(
                        'UPDATE cartChemical SET quantity = quantity - $3 WHERE cart_id = $1 AND Chemical_id = $2 returning *',
                        [cartChemical.cart_id, product_id, quantity]
                    );

                    if (updateCart.rows[0].quantity <= 0) {
                        const deleteCart = await client.query(
                            'DELETE FROM cartChemical WHERE cart_id = $1 AND Chemical_id = $2',
                            [cartChemical.cart_id, product_id]
                        );

                        res.json(deleteCart.rows[0]);
                        console.log(deleteCart.rows[0]);
                        return;
                    }


                    res.json(updateCart.rows[0]);
                    console.log(updateCart.rows[0]);
                    return;
                }
            }
        }
    } catch (error) {
        console.log(error.message);
    }
};


export const deleteCart = async (req, res) => {

    try {
        const { user_id } = req.body;

        const cart = await client.query(
            'SELECT * FROM CART WHERE cart_id = (\
                    SELECT cart_id FROM cart \
                    WHERE (customer_id = $1 OR researcher_id = $1) \
                        AND cart_status = false\
                )',
            [user_id]
        );

        console.log(cart.rows[0].cart_id);

        let isCustomer;

        if (cart.rows.length > 0) {
            isCustomer = cart.rows[0].iscustomer === true;
        } else {
            isCustomer = false;
        }

        if (isCustomer === true) {
            const deleteCart = await client.query(
                'DELETE FROM cartMedicine WHERE cart_id = $1',
                [cart.rows[0].cart_id]
            );

            res.json(deleteCart.rows[0]);
            console.log(deleteCart.rows[0]);
            return;
        } else if (isCustomer === false) {
            const deleteCart = await client.query(
                'DELETE FROM cartChemical WHERE cart_id = $1',
                [cart.rows[0].cart_id]
            );

            res.json(deleteCart.rows[0]);
            console.log(deleteCart.rows[0]);
            return;
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const getCart = async (req, res) => {
    
    try {
        const { user_id } = req.body;

        const cart = await client.query(
            'SELECT * FROM CART WHERE cart_id = (\
                    SELECT cart_id FROM cart \
                    WHERE (customer_id = $1 OR researcher_id = $1) \
                        AND cart_status = false\
                )',
            [user_id]
        );
        
        if (cart.rows.length === 0) {
            res.json([]);
            return;
        }

        console.log(cart.rows[0].cart_id);

        let isCustomer;

        if (cart.rows.length > 0) {
            isCustomer = cart.rows[0].iscustomer === true;
        } else {
            isCustomer = false;
        }

        if (isCustomer === true) {
            const cartMedicines = await client.query(
                'SELECT * FROM cartMedicine WHERE cart_id = $1',
                [cart.rows[0].cart_id]
            );

            res.json(cartMedicines.rows);
            console.log(cartMedicines.rows);
            return;
        } else if (isCustomer === false) {
            const cartChemicals = await client.query(
                'SELECT * FROM cartChemical WHERE cart_id = $1',
                [cart.rows[0].cart_id]
            );

            res.json(cartChemicals.rows);
            console.log(cartChemicals.rows);
            return;
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const getCartOnId = async (req, res) => {
    try {
        const { cart_id } = req.body;

        const cart = await client.query(
            'SELECT * FROM CART WHERE cart_id = $1',
            [cart_id]
        );

        if (cart.rows.length === 0) {
            res.json([]);
            return;
        }

        let isCustomer;

        if (cart.rows.length > 0) {
            isCustomer = cart.rows[0].iscustomer === true;
        } else {
            isCustomer = false;
        }

        if (isCustomer === true) {
            const cartMedicines = await client.query(
                'SELECT * FROM cartMedicine WHERE cart_id = $1',
                [cart_id]
            );

            res.json(cartMedicines.rows);
            console.log(cartMedicines.rows);
            return;
        } else if (isCustomer === false) {
            const cartChemicals = await client.query(
                'SELECT * FROM cartChemical WHERE cart_id = $1',
                [cart_id]
            );

            res.json(cartChemicals.rows);
            console.log(cartChemicals.rows);
            return;
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const setCartStatusTrue = async (req, res) => 
{
    try {

        //console.log('amit saha is here ');


        const { user_id } = req.body;

        console.log(user_id);

        let query = 
        "SELECT * FROM CART WHERE (CUSTOMER_ID = $1 OR RESEARCHER_ID = $1) AND CART_STATUS = false";

        const cart = await client.query(query, [user_id]);

        console.log(cart.rows[0].cart_id);

        const cartStatus = await client.query(
            'UPDATE cart SET cart_status = true WHERE cart_id = $1 returning *',
            [cart.rows[0].cart_id]
        );

        res.json(cartStatus.rows[0]);
        console.log(cartStatus.rows[0]);
        return;

    } catch (error) {
        console.log(error.message);

        //console.log('amit is not here');
    }
}

export const get_Big_CART_By_CartId = async (req, res) => {
    try {
        const { cart_id } = req.body;

        const cart = await client.query(
            'SELECT * FROM CART WHERE cart_id = $1',
            [cart_id]
        );

        if (cart.rows.length === 0) {
            res.json([]);
            return;
        }

        res.json(cart.rows[0]);
        console.log(cart.rows[0]);
        return;
        
    } catch (error) {
        console.log(error.message);
    }
}
