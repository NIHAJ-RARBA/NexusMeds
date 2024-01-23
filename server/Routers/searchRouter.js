import express from 'express';
const router = express.Router();

import {
  getSearchedMedicines,
  getSearchedChemicals
} from '../Controllers/searchController.js';


router.get('/getAllMeds', getSearchedMedicines);
router.get('/getAllChems', getSearchedChemicals);



export default router;
