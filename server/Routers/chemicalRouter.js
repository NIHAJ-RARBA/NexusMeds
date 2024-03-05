import express from 'express';
const router = express.Router();

import {
  getAllChemicals,
  createChemical,
  getChemicalById,
  updateChemicalById,
  deleteChemicalById,
  supplyChemical
} from '../Controllers/chemicalController.js';


router.get('/getAll', getAllChemicals);
router.post('/create', createChemical);
router.get('/get/:id', getChemicalById);
router.put('/update/:id', updateChemicalById);
router.delete('/delete/:id', deleteChemicalById);
router.post('/supply', supplyChemical);


export default router;
