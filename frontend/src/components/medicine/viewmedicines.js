import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes, link, Redirect, navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import MEDSPECIFIC from "./specificMedicine";


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

    const gotoSpecificMedicine = (medicine_id) => {
        console.log('Going to specific medicine with id:', medicine_id);
        window.location = `/specificmedicine/${medicine_id}`;

    };

    useEffect(() => {
        getMedicines();
    }, []);


    return (
        <div className="VIEWMEDICINES">
            

            <h2 className="text-center mt-5"><u> All Medicines</u></h2>
            <div className="medicine-list">
                {medicineList.map(medicine => (
                    <div key={medicine.medicine_id} className="medicine-box" onClick={() => gotoSpecificMedicine(medicine.medicine_id)} style={{ border: "1px solid black", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", display: "inline-block", margin: "10px", width: "30%" }}>
                        <h3>{medicine.med_name}</h3>
                        <img src={medicine.image} alt={`Image of ${medicine.med_name}`} style={{ maxWidth: '50%', height: 'auto' }}/>
                        <p><b>Generic Name:</b> {medicine.generic_name}</p>
                        <p><b>Package Type:</b> {medicine.package_type}</p>
                        <p><b>Price: </b>{medicine.price}</p>
                        <p><b>Available as:</b> {medicine.med_form}</p>
                        <p><b>Company:</b> {medicine.manufacturer_id}</p>
                        <p><b>Manufacturing Date:</b> {medicine.manufacturing_date}</p>
                        <p><b>Indication:</b> {medicine.indication}</p>
                        <p><b>Dosage: </b>{medicine.dosage}</p>
                        <p><b>Dosage Strength: </b>{medicine.dosagestrength}</p>
                        {/* <button className="btn btn-danger" onClick={() => deleteUser(medicine.medicine_name)}>Delete</button> */}
                        <p><b>Cautions: </b>{medicine.cautions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VIEWMEDICINES;