import express from "express";
import jwTokenGenerator from "../Utils/jwtTokenGenerator.js";
import validinfo from "../middleware/validinfo.js";

const router = express.Router();

import bcrypt from "bcrypt";
import client from "../DB.js";
import authorize from "../middleware/authorize.js";

router.get("/", (req, res) => {
    res.send("Hey it's working!");
});


router.post("/logout", async (req, res) => {
    
        try {
            
            
            const { id } = req.body;
            console.log("Logged out of " + id);

            const temp = await client.query
            (
                `UPDATE LOGIN_LOG
                SET LOGOUT_TIME = DATE_TRUNC('second', CURRENT_TIMESTAMP)
                WHERE USER_ID = $1 AND LOGOUT_TIME IS NULL;`, [id]
            );
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    
    }

);


router.post("/register/customer", validinfo, async (req, res) => {

    try {

        // console.log(req.body);

        var image = req.body.image;
        // 1. destructure the req.body (email, password, phone, customer_name, d.o.b, image, gender, address, billing_address)
        const { email, password, phone, customer_name, date_of_birth, gender, address, billing_address } = req.body;


        if (image == '' || image === null) {
            image = "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png";
        }

        // console.log(image);

        // 2. check if user exists (if user exists then throw error)

        const user = await client.query("SELECT * FROM customer WHERE email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists!");
        }

        // 3. bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);


        // 4. enter the new user inside our database

        const temp = await client.query("INSERT INTO customer (customer_id, email, password, phone, customer_name, date_of_birth, image, gender, address, billing_address) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
            [email, bcryptPassword, phone, customer_name, date_of_birth, image, gender, address, billing_address]);

        // 5. generating our jwt token

        const token = jwTokenGenerator(temp.rows[0].customer_id);

        res.json({ token });
        console.log(temp.rows[0]);




    } catch (error) {
        console.error('in register customer: ' + error.message);

        if (error.message.includes('12345')) {

            console.log('Name error: 12345');
            return res.status(400).json({ error: '12345' });

        }
        else if(error.message.includes('12346')){
            
            console.log('Email error: 12346');
            return res.status(400).json({ error: '12346' });
        }
        else {

            console.error(error.message);
            res.status(500).send("Server error");
        }
    }

});




router.post("/login/customer", validinfo, async (req, res) => {

    try {

        console.log(req.body);

        // 0. destructure the req.body

        const { email, password } = req.body;

        // 1. see if it is admin

        const adminRows = await client.query("SELECT * FROM admins WHERE email = $1 and password = $2", [email, password]);

        if (adminRows.rows.length !== 0) {

            const token = jwTokenGenerator(adminRows.rows[0].admin_id);
            
            return res.json({ token });
        }

        // 2. check if user doesn't exist (if not then throw error)

        const user = await client.query("SELECT * FROM customer WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credential");
        }

        // 3. check if incoming password is the same as the database password

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("Invalid Credential");
        }

        // 4. give them the jwt token

        // also log their login

        const temp = await client.query
        (`UPDATE LOGIN_LOG
        SET LOGOUT_TIME = DATE_TRUNC('second', CURRENT_TIMESTAMP)
        WHERE USER_ID = $1 AND LOGOUT_TIME IS NULL;`, [user.rows[0].customer_id]);

        const temp2 = await client.query(`

        INSERT INTO LOGIN_LOG (USER_ID, LOGIN_TIME) VALUES ($1, DATE_TRUNC('second', CURRENT_TIMESTAMP));`, [user.rows[0].customer_id]);

        const token = jwTokenGenerator(user.rows[0].customer_id);

        console.log(token);
        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error jwtRouter");
    }

});





router.post("/register/researcher", validinfo, async (req, res) => {

    try {

        var image = req.body.image;
        // 1. destructure the req.body (email, password, phone, researcher_name, d.o.b, image, gender, address, billing_address)
        const { email, password, phone, researcher_name, date_of_birth, gender, address, billing_address} = req.body;
        const permit = req.body.permit;

        if (image === null || image == '') {
            image = "https://i.pinimg.com/564x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg";
        }

        // 2. check if user exists (if user exists then throw error)

        const user = await client.query("SELECT * FROM researcher WHERE email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists!");
        }

        // 3. bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);


        // 4. enter the new user inside our database

        const temp = await client.query("INSERT INTO researcher (researcher_id, email, password, phone, researcher_name, date_of_birth, image, gender, address, billing_address, isapproved) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;",
            [email, bcryptPassword, phone, researcher_name, date_of_birth, image, gender, address, billing_address, false]);

        const temp2 = await client.query("INSERT INTO pending_approvals (researcher_id, photo) VALUES ($1, $2) RETURNING *;",
            [temp.rows[0].researcher_id, permit]);

        // 5. generating our jwt token

        const token = jwTokenGenerator(temp.rows[0].researcher_id);

        res.json({ token });
        console.log(temp.rows[0]);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }

});




router.post("/login/researcher", validinfo, async (req, res) => {

    try {

        // 0. destructure the req.body

        const { email, password } = req.body;

        // 1. see if it is admin

        const adminRows = await client.query("SELECT * FROM admins WHERE email = $1 and password = $2", [email, password]);

        if (adminRows.rows.length !== 0) {
                
                const token = jwTokenGenerator(adminRows.rows[0].admin_id);
    
                return res.json({ token });
            }



        // 2. check if user doesn't exist (if not then throw error)


        const user = await client.query("SELECT * FROM researcher WHERE email = $1", [email]);

        if (user.rows.length === 0) {

            return res.status(401).json("Invalid Credential");
            
        }

        if (user.rows[0].isapproved === false) {
            return res.status(401).json("Not Yet Approved");
        }

        // 3. check if incoming password is the same as the database password

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("Invalid Credential");
        }

        // 4. give them the jwt token

        // also log their login

        const temp = await client.query
        (`UPDATE LOGIN_LOG
        SET LOGOUT_TIME = DATE_TRUNC('second', CURRENT_TIMESTAMP)
        WHERE USER_ID = $1 AND LOGOUT_TIME IS NULL; `, [user.rows[0].researcher_id]);

        const temp2 = await client.query(`

        INSERT INTO LOGIN_LOG (USER_ID, LOGIN_TIME) VALUES ($1, DATE_TRUNC('second', CURRENT_TIMESTAMP));`, [user.rows[0].researcher_id]);

        console.log("Login data in login log: " + temp.rows[0]);

        const token = jwTokenGenerator(user.rows[0].researcher_id);

        res.json({ token });



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }

});





router.get("/verify", authorize, async (req, res) => {

    try {

        // 1. if token is valid then user is verified

        res.json(true);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }

});




export default router;