import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'reactstrap';

const MEDSPECIFIC = () => {
    const id = useParams();
    const [medicine, setMedicine] = useState({});
    const [manufacturer, setManufacturer] = useState('');

    const getMedicine = async () => {
        try {
            const response = await fetch(`http://localhost:5000/medicine/get/${id.id}`);
            const jsonData = await response.json();
            setMedicine(jsonData);

            if (jsonData.manufacturer_id) {
                const responseForManufacturer = await fetch(`http://localhost:5000/manufacturer/${jsonData.manufacturer_id}`);
                const jsonDataForManufacturer = await responseForManufacturer.json();
                setManufacturer(jsonDataForManufacturer.manufacturer_name);
            }
        } catch (error) {
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
                        <Card className="p-3">
                            <div className="d-flex align-items-start">
                                <div className="border border-secondary rounded overflow-hidden mr-3" style={{ width: '400px', height: '400px' }}>
                                    {/* Image with square border */}
                                    <img src={medicine.image} alt={`Image of ${medicine.med_name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div id="product_details" className="d-flex flex-column justify-content-start" style={{ marginLeft: '40px' }}>
                                    <div>
                                        <h1 className="name">{medicine.med_name}</h1>
                                        <h6 className="text-secondary">{medicine.med_form}</h6>
                                        <div className="generes-wrap">
                                            <p className="generes ml-0"><strong>Generics:</strong><span>{medicine.generic_name}</span></p>
                                        </div>
                                        <p className="manufacturer">{manufacturer && <span>{manufacturer}</span>}</p>
                                    </div>
                                    <div>
                                        <label className="">
                                            <span className="price-label">Price : ৳ </span>
                                            <label className="price">{medicine.price}</label>
                                            <span className="regular-price">{medicine.regular_price}</span>
                                        </label>
                                    </div>

                                    <div id="prescription_and_availability" className="ml-auto">
                                        <label className="">Prescription Required <i className="fa ml-2"></i></label>
                                        <label className="">will be available</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p><b>Indication:</b> {medicine.indication}</p>
                                <p><b>Dosage: </b>{medicine.dosage}</p>
                                <p><b>Dosage Strength: </b>{medicine.dosagestrength}</p>
                                <p><b>Cautions: </b>{medicine.cautions}</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MEDSPECIFIC;
