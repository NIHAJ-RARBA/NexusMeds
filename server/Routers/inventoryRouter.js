import express from 'express';
const router = express.Router();

import {
  getInventoryByMedicineId,
  getInventoryByChemicalId,
  getProductsInventory
} from '../Controllers/inventoryController.js';


router.get('/medicine/:id',getInventoryByMedicineId);
router.get('/chemical/:id',getInventoryByChemicalId);
router.post('/products',getProductsInventory);


export default router;
