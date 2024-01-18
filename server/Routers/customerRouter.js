import express from 'express';
const router = express.Router();

import {
  
    getAllCustomers,
    createCustomer,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
} from '../Controllers/customerController.js';


router.get('/getAll', getAllCustomers);
router.post('/create', createCustomer);
router.get('/:id', getCustomerById);
router.put('/update/:id', updateCustomerById);
router.delete('/delete/:id', deleteCustomerById);


export default router;
