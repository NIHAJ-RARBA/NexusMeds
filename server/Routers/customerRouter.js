import express from 'express';
import client from "../DB.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

import {
  
    getAllCustomers,
    // createCustomer,
    getCustomerByEmail,
    updateCustomerById,
    deleteCustomerById
} from '../Controllers/customerController.js';


router.get('/getAll', getAllCustomers);
// router.post('/create', createCustomer);
router.get('/:email', getCustomerByEmail);
router.put('/update/:id', updateCustomerById);
router.delete('/delete/:id', deleteCustomerById);


router.get('/dashboard', authorize, async (req, res) => {
    try {
        // req.user has the payload
        const user = await client.query("SELECT customer_name FROM customer WHERE customer_id = $1",
            [req.user.id]);


        res.json({ researcher_name: "hi" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});


export default router;
