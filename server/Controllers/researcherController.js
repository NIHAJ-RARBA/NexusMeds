import client from '../DB.js';

export const getAllResearchers = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Researcher');
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
};

export const getResearcherById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM Researcher WHERE researcher_id = $1', [id]);
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
}

export const getAllVerifiedResearchers = async (req, res) => {
    console.log("get all verified researchers");
    try {
        const result = await client.query('SELECT * FROM researcher WHERE isapproved = true');
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
};

export const getNONVerifiedResearchers = async (req, res) => {

    try {
        const result = await client.query('SELECT * FROM researcher WHERE isapproved = false and researcher_id IN (SELECT researcher_id FROM pending_approvals)');
        
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
};

export const getNONAPPROVEDResearcher = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await client.query('SELECT * FROM pending_approvals WHERE researcher_id =(SELECT researcher_id FROM researcher WHERE email = $1)', [email]);
        
        if (result.rowCount > 0)
        {
            console.log(result.rows[0].photo);
            console.log("get all non verified researchers");
            // console.log(result.rows[0].photo);
            res.status(200).json(result.rows[0].photo);

        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
};

export const approveResearcher = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await client.query('UPDATE researcher SET isapproved = true WHERE researcher_id = $1', [id]);

        console.log("Updated researher table");

        const result2 = await client.query('DELETE FROM pending_approvals WHERE researcher_id = $1', [id]);

        console.log("Deleted from pending approvals");


        res.status(200).json({ message: 'Researcher approved' });



    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
};

export const rejectResearcher = async (req, res) => {
    try {

        console.log("Rejecting researcher");
        const { id } = req.body;
        const result = await client.query('UPDATE researcher SET isapproved = false WHERE researcher_id = $1', [id]);

        console.log("Rejected!");

        const result2 = await client.query('DELETE FROM pending_approvals WHERE researcher_id = $1', [id]);

        console.log("Deleted from pending approvals");

        res.status(200).json({ message: 'Researcher rejected' });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
};


// used before, no longer in use

// export const createResearcher = async (req, res) => {
//     try {
//         const { email, phone, researcher_name, date_of_birth, image, gender, address, billing_address, isApproved } = req.body;

//         const newResearcher = await client.query(
//             "INSERT INTO Researcher (email, phone, researcher_name, date_of_birth, image, gender, address, billing_address, isApproved) VALUES (uuid_generate_v4(),$1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
//             [email, phone, researcher_name, date_of_birth, image, gender, address, billing_address, isApproved]
//         );

//         res.json(newResearcher.rows[0]);
//         console.log(req.body);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// };

export const getResearcherByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const researcher = await client.query("SELECT * FROM Researcher WHERE email = $1", [email]);

        res.json(researcher.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

export const updateResearcherById = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, phone, researcher_name, date_of_birth, image, gender, address, billing_address, isApproved } = req.body;

        const updateResearcher = await client.query(
            "UPDATE Researcher SET email = $1, phone = $2, researcher_name = $3, date_of_birth = $4, image = $5, gender = $6, address = $7, billing_address = $8, isApproved = $9 WHERE researcher_id = $10 RETURNING *",
            [email, phone, researcher_name, date_of_birth, image, gender, address, billing_address, isApproved, id]
        );

        res.json({ message: "Researcher was updated", researcher: updateResearcher.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteResearcherById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteResearcher = await client.query("DELETE FROM Researcher WHERE researcher_id = $1", [id]);

        res.json({ message: "Researcher was deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteResearcherByEmail = async (req, res) => {
    try {

        
        const { email } = req.params;
        console.log(email);
        const deleteResearcher = await client.query("DELETE FROM Researcher WHERE email = $1", [email]);

        res.json({ message: "Researcher was deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getPendingOrders = async (req, res) => {
    try {

        const { id } = req.body;
        console.log(req.body);

        console.log('id:', id );

        const query = "SELECT * \
        FROM orders\
        WHERE cart_id in (select cart_id from cart where researcher_id = $1 and status = false)";

        const result = await client.query(query, [id]);
        res.status(200).json(result.rows);
        
        //console.log(result.rows);

    } catch (error) {

        res.status(500).json({ error: error });
        console.log(error.message);
    }
}

export const getOrderHistory = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(req.body);

        const query = "SELECT * \
        FROM order_history\
        WHERE user_id = $1";

        const result = await client.query(query, [id]);
        res.status(200).json(result.rows);
        
        //console.log(result.rows);

    } catch (error) {

        res.status(500).json({ error: error });
        console.log(error.message);
    }
}
