import express from 'express';
const router = express.Router();

import {
  getInventoryByMedicineId
} from '../Controllers/inventoryController.js';


router.get('/medicine/:id',getInventoryByMedicineId);


export default router;
