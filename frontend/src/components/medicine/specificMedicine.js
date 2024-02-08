import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Image, Container, Row, Col } from 'reactstrap';

const MEDSPECIFIC = () => {
    // const [medicine, setMedicine] = useState(9);
    // const [manufacturer, setManufacturer] = useState({});

    // useEffect(() => {
    //     const id = 9; // Replace with the actual medicine id
    //     fetch(`http://localhost:5000/medicine/${id}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setMedicine(data);
    //             // fetch(`http://localhost:5000/manufacturer/${data.manufacturer_id}`)
    //             //     .then(response => response.json())
    //             //     .then(data => {
    //             //         setManufacturer(data);
    //             //     })
    //             //     .catch(function (error) {
    //             //         console.log(error);
    //             //     })
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }, []);

    return (
        <div>
                {/* <Row>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={medicine.image} />
                            <Card.Body>
                                <Card.Title>{medicine.med_name}</Card.Title>
                                <Card.Text>
                                    <p>Price: {medicine.price}</p>
                                    <p>Generic Name: {medicine.generic_name}</p>
                                    <p>Package Type: {medicine.package_type}</p>
                                    <p>Medicine Form: {medicine.med_form}</p>
                                    <p>Indication: {medicine.indication}</p>
                                    <p>Dosage: {medicine.dosage}</p>
                                    <p>Dosage Strength: {medicine.dosageStrength}</p>
                                    <p>Cautions: {medicine.cautions}</p>
                                </Card.Text>
                                <Link to={`/manufacturer/${medicine.manufacturer_id}`}>
                                    <Button variant="primary">Manufacturer: {manufacturer.manufacturer_name}</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> */}
        </div>
    )
}


export default MEDSPECIFIC;
