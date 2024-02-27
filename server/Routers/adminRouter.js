import express from "express";
import client from "../DB.js";
import authorize from "../middleware/authorize.js";


const router = express.Router();

router.post('/', authorize, async (req, res) => {
    try {
        
        const user = await client.query("SELECT admin_id, email from admins WHERE admin_id = $1",
            [req.user.id]);

        res.json(user.rows[0]);
        console.log(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});



export default router;