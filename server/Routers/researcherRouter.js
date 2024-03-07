import express from 'express';
import client from "../DB.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

import {
  
    getAllResearchers,
    // createResearcher,
    getResearcherByEmail,
    updateResearcherById,
    deleteResearcherById,
    getAllVerifiedResearchers,
    getNONVerifiedResearchers,
    deleteResearcherByEmail,
    getNONAPPROVEDResearcher,
    approveResearcher,

    rejectResearcher,
    getResearcherById

} from '../Controllers/researcherController.js';


router.get('/getAll', getAllResearchers);
router.get('/allverified', getAllVerifiedResearchers);
router.get('/get-Not-Verified', getNONVerifiedResearchers);
// router.post('/create', createResearcher);
router.get('/:email', getResearcherByEmail);
router.put('/update/:id', updateResearcherById);
// router.delete('/delete/:id', deleteResearcherById);
router.delete('/delete/:email', deleteResearcherByEmail);
router.get('/getPermit/:email', getNONAPPROVEDResearcher);
router.post('/approve-researcher', approveResearcher);
router.post('/reject-researcher', rejectResearcher);

router.get('/:id', getResearcherById);



router.post('/', authorize, async (req, res) => {
    try {
        // req.user has the payload
        const user = await client.query("SELECT researcher_id, researcher_name, email, phone, date_of_birth, image, gender, address, billing_address FROM researcher WHERE researcher_id = $1",
            [req.user.id]);

        if (user.rows[0] == null) {
            res.json("No researcher found");
        }
        else {
            res.json(user.rows[0]);
            console.log(user.rows[0]);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});

export default router;
