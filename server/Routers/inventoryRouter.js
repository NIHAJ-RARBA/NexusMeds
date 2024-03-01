import express from 'express';
const router = express.Router();

import {
  getInventoryByMedicineId,
  getInventoryByChemicalId
} from '../Controllers/inventoryController.js';


router.get('/medicine/:id',getInventoryByMedicineId);
router.get('/chemical/:id',getInventoryByChemicalId);


export default router;
