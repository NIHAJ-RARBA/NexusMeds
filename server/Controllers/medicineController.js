// const client = require('./DB.js');
import e from 'express';
import client from '../DB.js';

export const getAllMedicines = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM medicine');
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (error) {

        res.status(500).json({ error: error });
        console.log(error.message);
    }
};

export const getMedicineByIsOTC = async (req, res) => {

    try {
        const { isOTC } = req.params;

        let sql = "SELECT * FROM medicine WHERE isOTC = $1";

        const medicine = await client.query(sql, [isOTC]);

        res.status(200).json(medicine.rows);

    } catch (error) {
        console.log(error.message);
    }
}


export const createMedicine = async (req, res) => {
    try {
        const {
            med_name,
            price,
            image,
            generic_name,
            package_type,
            med_form,
            isOTC,
            manufacturer_id,
            indication,
            dosage,
            dosageStrength,
            cautions
        } = req.body;

        const newMedicine = await client.query(
            "INSERT INTO medicine (med_name, price, image, generic_name, package_type, med_form, isOTC, manufacturer_id, indication, dosage, dosageStrength, cautions) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;",
            [med_name, price, image, generic_name, package_type, med_form, isOTC, manufacturer_id, indication, dosage, dosageStrength, cautions]
        );

        res.json(newMedicine.rows[0]);
        console.log(req.body);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};


export const getMedicineById = async (req, res) => {
    try {
        const { id } = req.params;
        const medicine = await client.query("SELECT * FROM medicine WHERE medicine_id = $1", [id]);

        res.status(200).json(medicine.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateMedicineById = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            med_name,
            price,
            image,
            generic_name,
            package_type,
            med_form,
            isOTC,
            manufacturer_id,
            indication,
            dosage,
            dosageStrength,
            cautions
        } = req.body;
        const updateMedicine = await client.query(

            "UPDATE medicine SET med_name = $1, price = $2, image = $3, generic_name = $4, package_type = $5, med_form = $6, isOTC = $7, manufacturer_id = $8, indication = $9, dosage = $10, dosageStrength = $11, cautions = $12 WHERE medicine_id = $13 RETURNING *",

            [med_name, price, image, generic_name, package_type, med_form, isOTC, manufacturer_id, indication, dosage, dosageStrength, cautions, id]

        );

        res.json({ message: "Medicine was updated", medicine: updateMedicine.rows[0] });

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteMedicineById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteMedicine = await client.query("DELETE FROM medicine WHERE medicine_id = $1", [id]);

        res.json({ message: "Medicine was deleted" });
    } catch (error) {
        console.log(error.message);
    }
}

export const getMedicineManufacturerById = async (req, res) => {
    try {

        const { id } = req.params;

        let sql = "SELECT M.manufacturer_name\
        FROM medicine MED JOIN manufacturer M\
        ON MED.manufacturer_id = M.manufacturer_id\
        WHERE MED.medicine_id = $1";


        const manufacturer = await client.query(sql, [id]);

        res.status(200).json(manufacturer.rows);

    } catch (error) {
        console.log(error.message);
    }
}

export const getChemicalByMedicineId = async (req, res) => {

    try {
        const { id } = req.params;

        let sql = "SELECT C.*\
        FROM medicinechemical MC JOIN chemical C\
        ON MC.chemical_id = C.chemical_id\
        WHERE medicine_id = $1 \
        ORDER BY C.chemical_id";

        const chemical = await client.query(sql, [id]);

        res.status(200).json(chemical.rows);

    } catch (error) {
        console.log(error.message);
    }
}

