import client from "../DB.js";

export const getManufacturerById = async (req, res) => {
    try {
        const { id } = req.params;
        const manufacturer = await client.query("SELECT * FROM manufacturer WHERE manufacturer_id = $1", [id]);

        res.json(manufacturer.rows[0]);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}


