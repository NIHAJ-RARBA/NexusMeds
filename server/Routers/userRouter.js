import express from 'express';
const router = express.Router();

import {
  
    getAllUsers
} from '../Controllers/userController.js';


router.get('/getAll', getAllUsers);


export default router;
