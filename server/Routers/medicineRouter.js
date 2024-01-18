import express from 'express';
const router = express.Router();

import {
  getAllMedicines
} from '../Controllers/medicineController.js';


router.get('/getAll', getAllMedicines);


export default router;
