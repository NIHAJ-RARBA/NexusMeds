import express from 'express';
const router = express.Router();

import {
  getSearchedMedicines,
  getSearchedChemicals
} from '../Controllers/searchController.js';


router.post('/getAllMeds', getSearchedMedicines);
router.post('/getAllChems', getSearchedChemicals);



export default router;
