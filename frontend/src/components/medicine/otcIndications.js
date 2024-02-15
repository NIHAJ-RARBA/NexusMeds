import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes, link, Redirect, navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import MEDSPECIFIC from "./specificMedicine";


const VIEWOTC = () => {
    
    const [indicationList, setIndicationList] = useState([]);


    const getIndications = async () => {

        try {
            const response = await fetch("http://localhost:5000/medicine/isOTC/true/indications");
            const jsonData = await response.json();

            setIndicationList(jsonData);
        }
        catch (error) {
            console.error(error.message);
        }
    };


const countElements = async (indication) => {
    try {
        const response = await fetch(`http://localhost:5000/medicine/isOTC/true/indications/${indication}`);
        const jsonData = await response.json();
        return jsonData.length;
    } catch (error) {
        console.error(error.message);
        return 0;
    }
};

const gotoMedicineByIndication = async (indication) => {
    try {
        const count = await countElements(indication);
        if (count > 0) {
            window.location = `/viewotc/${indication}`;
        } else {
            window.location = `/sorry`;
        }
    } catch (error) {
        console.error(error.message);
        // Redirect to sorry page in case of an error
        window.location = `/sorry`;
    }
};






    useEffect(() => {

        getIndications();
    }, []);


    return (

        
        <div className="VIEWOTC">


            <h2 className="text-center mt-5"><u>OTC MEDICINES</u></h2>
            <div className="medicine-list">
                {indicationList.map(indication => (
                    <div key={indication.indication} className="medicine-box" onClick={() => gotoMedicineByIndication(indication.indication)} style={{ border: "1px solid black", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", display: "inline-block", margin: "10px", width: "30%" }}>
                        <h3>{indication.indication}</h3>
                    </div>
                ))}
            </div>

        </div>
        


    );
};

export default VIEWOTC;