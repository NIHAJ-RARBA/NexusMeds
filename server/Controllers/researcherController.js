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
        const result = await client.query('SELECT * FROM rsearcher WHERE isapproved = false');
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
}


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
