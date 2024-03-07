import client from '../DB.js';

export const getAllChemicals = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Chemical');
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
};

export const createChemical = async (req, res) => {
    try {
        const {
            chem_name,
            image,
            iupac_name,
            manufacturer_id,
            chemical_formula,
            description,
            molecular_weight,
            price
        } = req.body;

        const newChemical = await client.query(
            "INSERT INTO Chemical (chem_name, image, iupac_name, manufacturer_id, chemical_formula, description, molecular_weight, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
            [chem_name, image, iupac_name, manufacturer_id, chemical_formula, description, molecular_weight, price]
        );

        res.json(newChemical.rows[0]);
        console.log(req.body);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

export const getChemicalById = async (req, res) => {
    try {
        const { id } = req.params;
        const chemical = await client.query("SELECT * FROM Chemical WHERE chemical_id = $1", [id]);

        res.status(200).json(chemical.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
};

export const updateChemicalById = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            chem_name,
            image,
            iupac_name,
            manufacturer_id,
            parent_chemical_id,
            chemical_formula,
            description,
            molecular_weight,
            price
        } = req.body;

        const updateChemical = await client.query(
            "UPDATE Chemical SET chem_name = $1, image = $2, iupac_name = $3, manufacturer_id = $4, parent_chemical_id = $5, chemical_formula = $6, description = $7, molecular_weight = $8, price = $9 WHERE chemical_id = $10 RETURNING *",
            [chem_name, image, iupac_name, manufacturer_id, parent_chemical_id, chemical_formula, description, molecular_weight, price, id]
        );

        res.json({ message: "Chemical was updated", chemical: updateChemical.rows[0] });

    } catch (error) {
        console.log(error.message);
    }
};

export const deleteChemicalById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteChemical = await client.query("DELETE FROM Chemical WHERE chemical_id = $1", [id]);

        res.json({ message: "Chemical was deleted" });
    } catch (error) {
        console.log(error.message);
    }
};

export const supplyChemical = async (req, res) => {
    try {
        const { id, quantity } = req.body;

        const query = 'INSERT INTO supplyrequestchemical (chemical_id, quantity, request_date)\
        VALUES ($1, $2,$3)';

        const supply = await client.query(query, [id, quantity, new Date()]);
        res.json({ message: "Chemical was supplied" });
        
    } catch (error) {
        console.log(error.message);
    }
};
