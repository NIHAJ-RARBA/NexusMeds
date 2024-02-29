import express from 'express';
import client from "../DB.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

import {
  
    getAllCustomers,
    // createCustomer,
    getCustomerByEmail,
    deleteCustomerByEmail,
    getCustomerById,
    updateCustomerByEmail,
    getTotalSpentByCustomer
} from '../Controllers/customerController.js';
import { get } from 'http';


router.get('/getAll', getAllCustomers);
// router.post('/create', createCustomer);
router.get('/:email', getCustomerByEmail); 
router.put('/update/:email', updateCustomerByEmail);
router.delete('/delete/:email', deleteCustomerByEmail);
router.get('/get/:id',getCustomerById);
router.post('/totalSpent',getTotalSpentByCustomer);


router.post('/', authorize, async (req, res) => {
    try {
        
        const user = await client.query("SELECT customer_id, customer_name, email, phone, date_of_birth, image, gender, address, billing_address FROM customer WHERE customer_id = $1",
            [req.user.id]);

            
            if (user.rows[0] == null) {
                res.json("No user found");
            }
            else {
                res.json(user.rows[0]);
                console.log(user.rows[0]);  
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});


export default router;
