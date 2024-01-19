import express from 'express';
import client from "../DB.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

import {
  
    getAllResearchers,
    // createResearcher,
    getResearcherByEmail,
    updateResearcherById,
    deleteResearcherById
} from '../Controllers/researcherController.js';


router.get('/getAll', getAllResearchers);
// router.post('/create', createResearcher);
router.get('/:email', getResearcherByEmail);
router.put('/update/:id', updateResearcherById);
router.delete('/delete/:id', deleteResearcherById);

router.get('/', authorize, async (req, res) => {
    try {
        // req.user has the payload
        const user = await client.query("SELECT researcher_name FROM researcher WHERE researcher_id = $1",
            [req.user.id]);

        res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});

export default router;
