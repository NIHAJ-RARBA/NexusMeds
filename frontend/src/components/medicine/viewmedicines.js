import React, { useState, useEffect } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Container } from "reactstrap";

const VIEWMEDICINES = () => {
    const [medicineList, setMedicineList] = useState([]);

    const getMedicines = async () => {
        try {
            const response = await fetch("http://localhost:5000/medicine/getall");
            const jsonData = await response.json();
            setMedicineList(jsonData);
        } catch (error) {
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
        <Container>
            <div style={{ marginTop: '115px' }}></div>
            <h2 className="text-center mt-5"><u>Available Medicines</u></h2>
            <div className="row row-cols-1 row-cols-md-3">
    {medicineList.map((medicine) => (
        <div key={medicine.medicine_id} className="col mb-4">
            <Card className="h-100 medicine-box" onClick={() => gotoSpecificMedicine(medicine.medicine_id)} style={{ borderRadius: '10px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)', display: 'flex', flexDirection: 'column' }}>
                <CardImg top src={medicine.image} alt={`Image of ${medicine.med_name}`} style={{ flex: '1 1 auto', maxHeight: '200px', width: '100%', objectFit: 'contain' }} />
                <CardBody style={{ flex: '0 0 auto' }}>
                    <CardTitle tag="h5"><b>{medicine.med_name} {medicine.dosagestrength}</b></CardTitle>
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


        </Container>
    );
};

export default VIEWMEDICINES;
