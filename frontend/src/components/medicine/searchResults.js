import React, { useEffect, useState } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

const SEARCHRESULTS = () => {
    const [medicineList, setMedicineList] = useState([]);

    useEffect(() => {
        const fetchMedicineList = async () => {
            const storedMedicineList = localStorage.getItem('searchResults');
            if (storedMedicineList) {
                try {
                    const parsedMedicineList = JSON.parse(storedMedicineList);
                    setMedicineList(parsedMedicineList);
                } catch (error) {
                    console.error('Error parsing medicine list:', error);
                }
            }
        };

        fetchMedicineList();
    }, []);

    const gotoSpecificMedicine = (medicine_id) => {
        console.log('Going to specific medicine with id:', medicine_id);
        window.location = `/specificmedicine/${medicine_id}`;
    };

    return (
        <div className="SEARCHRESULTS">
            <div style={{ marginTop: "115px" }}></div>
            <div className="row row-cols-1 row-cols-md-3">
                {medicineList.map((medicine) => (
                    <div key={medicine.medicine_id} className="col mb-4">
                        <Card
                            className="h-100 medicine-box"
                            onClick={() => gotoSpecificMedicine(medicine.medicine_id)}
                            style={{
                                borderRadius: "10px",
                                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                                <CardTitle tag="h5">
                                    <b>
                                        {medicine.med_name} {medicine.dosagestrength}
                                    </b>
                                </CardTitle>
                            <CardImg
                                top
                                src={medicine.image}
                                alt={`Image of ${medicine.med_name}`}
                                style={{
                                    flex: "1 1 auto",
                                    maxHeight: "200px",
                                    width: "100%",
                                    objectFit: "contain",
                                }}
                            />
                            <CardBody style={{ flex: "0 0 auto" }}>
                                <CardText>
                                    <b>Generic Name:</b> {medicine.generic_name} <br />
                                    <b>Package Type:</b> {medicine.package_type} <br />
                                    <b>Price:</b> {medicine.price} <br />
                                    <b>Available as:</b> {medicine.med_form} <br />
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SEARCHRESULTS;
