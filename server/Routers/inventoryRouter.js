import express from 'express';
const router = express.Router();

import {
  getInventoryByMedicineId,
  getInventoryByChemicalId,
  getProductsInventory,
  checkAvailability
} from '../Controllers/inventoryController.js';


router.get('/medicine/:id',getInventoryByMedicineId);
router.get('/chemical/:id',getInventoryByChemicalId);
router.post('/products',getProductsInventory);
router.post('/checkAvailability',checkAvailability);


export default router;
