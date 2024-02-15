import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes, link, Redirect, navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import MEDSPECIFIC from "./specificMedicine";


const VIEWOTC = () => {
    
    const indication = useParams();

    const [medicineList, setmedicineList] = useState([]);

    const getMedicinesByIndication = async (indication) => {
        try {
            const response = await fetch(`http://localhost:5000/medicine/isOTC/true/indications/${indication}`);
            const jsonData = await response.json();
            
            console.log('Medicines for indication:', indication, jsonData);
            setmedicineList(jsonData);
        } catch (error) {
            console.error(error.message);
        }


    };




    const gotoSpecificMedicine = (medicine_id) => {
        console.log('Going to specific medicine with id:', medicine_id);
        window.location = `/specificmedicine/${medicine_id}`;
    };



    useEffect(() => {
        getMedicinesByIndication(indication.indication);

        // getIndications();
    }, []);


    return (



        //show the list of indications in a tiled way using cards


        <div className="VIEWOTC">

            <div className="medicine-list">
                {medicineList.map(medicine => (
                    <div key={medicine.medicine_id} className="medicine-box" onClick={() => gotoSpecificMedicine(medicine.medicine_id)} style={{ border: "1px solid black", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", display: "inline-block", margin: "10px", width: "30%" }}>
                        <h3>{medicine.med_name}</h3>
                        <img src={medicine.image} alt={`Image of ${medicine.med_name}`} style={{ maxWidth: '50%', height: 'auto' }}/>
                        <p><b>Generic Name:</b> {medicine.generic_name}</p>
                        <p><b>Package Type:</b> {medicine.package_type}</p>
                        <p><b>Price: </b>{medicine.price}</p>
                        <p><b>Available as:</b> {medicine.med_form}</p>
                        
                        <p><b>Dosage Strength: </b>{medicine.dosagestrength}</p>

                    </div>
                ))}
            </div>
        </div>
        


    );
};

export default VIEWOTC;