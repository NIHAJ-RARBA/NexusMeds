import express from 'express';
const router = express.Router();

import {
  
    getAllResearchers,
    createResearcher,
    getResearcherById,
    updateResearcherById,
    deleteResearcherById
} from '../Controllers/researcherController.js';


router.get('/getAll', getAllResearchers);
router.post('/create', createResearcher);
router.get('/:id', getResearcherById);
router.put('/update/:id', updateResearcherById);
router.delete('/delete/:id', deleteResearcherById);


export default router;
