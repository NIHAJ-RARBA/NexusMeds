import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Image, Container, Row, Col } from 'reactstrap';

const MEDSPECIFIC = () => {

    const id = useParams();
    console.log(id);

    const [medicine, setMedicine] = useState({});
    const [manufacturer, setManufacturer] = useState({});

    const getMedicine = async () => {
        try {
            const response = await fetch(`http://localhost:5000/medicine/get/${id.id}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setMedicine(jsonData);

            console.log(medicine);
        }
        catch (error) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        getMedicine();
    }, []);

    return (
        <div>
            <h1 className="text-center mt-5"><u>Medicine Details</u></h1>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <img src={medicine.image} alt={`Image of ${medicine.med_name}`} style={{ maxWidth: '50%', height: 'auto' }} />
                            <h3>{medicine.med_name}</h3>
                            <p><b>Generic Name:</b> {medicine.generic_name}</p>
                            <p><b>Package Type:</b> {medicine.package_type}</p>
                            <p><b>Price: </b>{medicine.price}</p>
                            <p><b>Available as:</b> {medicine.med_form}</p>
                            <p><b>Company:</b> {medicine.manufacturer_id}</p>
                            <p><b>Manufacturing Date:</b> {medicine.manufacturing_date}</p>
                            <p><b>Indication:</b> {medicine.indication}</p>
                            <p><b>Dosage: </b>{medicine.dosage}</p>
                            <p><b>Dosage Strength: </b>{medicine.dosagestrength}</p>
                            <p><b>Cautions: </b>{medicine.cautions}</p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default MEDSPECIFIC;
