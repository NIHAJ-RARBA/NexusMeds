import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const VIEWMEDICINES = () => {
    
    const [medicineList, setmedicineList] = useState([]);

    const getMedicines = async () => {

        try {
            const response = await fetch("http://localhost:5000/medicine/getall");
            const jsonData = await response.json();

            setmedicineList(jsonData);
        }
        catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getMedicines();
    }, []);


    return (
        <div className="VIEWMEDICINES">
            <h2 className="text-center mt-5"><u> All Medicines</u></h2>
            <div className="medicine-list">
                {medicineList.map(medicine => (
                    <div key={medicine.medicine_id} className="medicine-box" style={{ border: "1px solid black", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", display: "inline-block", margin: "10px", width: "30%" }}>
                        <h3>{medicine.med_name}</h3>
                        <img src={medicine.image} alt={medicine.medicine_name} />
                        <p>Generic Name: {medicine.generic_name}</p>
                        <p>Package Type: {medicine.package_type}</p>
                        <p>Price: {medicine.price}</p>
                        <p>Available as: {medicine.med_form}</p>
                        <p>Company: {medicine.manufacturer_id}</p>
                        <p>Manufacturing Date: {medicine.manufacturing_date}</p>
                        <p>Indication: {medicine.indication}</p>
                        <p>Dosage: {medicine.dosage}</p>
                        <p>Dosage Strength: {medicine.dosagestrength}</p>
                        {/* <button className="btn btn-danger" onClick={() => deleteUser(medicine.medicine_name)}>Delete</button> */}
                        <p>Cautions: {medicine.cautions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VIEWMEDICINES;