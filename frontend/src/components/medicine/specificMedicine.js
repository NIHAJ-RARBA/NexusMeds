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
            <h1 className="text-center mt-5">{medicine.med_name}</h1>
            <Container>
                <Row>
                    <Col>
                        <Card className="p-3">
                        <div className="d-flex align-items-start">
    <div className="border border-secondary rounded overflow-hidden mr-3" style={{ width: '400px', height: '400px' }}>
        {/* Image with square border */}
        <img src={medicine.image} alt={`Image of ${medicine.med_name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div id="product_details" className="d-flex flex-column" style={{ marginLeft: '40px' }}>
        <div className="align-self-start">
            {/* <h1 className="name">{medicine.med_name}</h1> */}
            <h6 className="text-secondary font-weight-bold" style={{ fontSize: '1.25rem' }}>{medicine.med_form}</h6>
            <div className="generes-wrap">
                <p className="generes ml-0"><strong>Generics:</strong><span className="font-weight-bold" style={{ fontSize: '1rem' }}>{medicine.generic_name}</span></p>
            </div>
            <p className="manufacturer" style={{ fontSize: '1rem' }}>{manufacturer && <span className="font-weight-bold">{manufacturer}</span>}</p>
        </div>
        <div className="align-self-start">
            <label className="">
                <span className="price-label font-weight-bold" style={{ fontSize: '1.25rem' }}>Price : ৳ </span>
                <label className="price font-weight-bold" style={{ fontSize: '1.25rem' }}>{medicine.price}</label>
                <span className="regular-price font-weight-bold" style={{ fontSize: '1rem' }}>{medicine.regular_price}</span>
            </label>
        </div>
    <div id="prescription_and_availability">
        <label className="font-weight-bold" style={{ fontSize: '1rem' }}>Prescription Required <i className="fa ml-2"></i></label>
        <label className="font-weight-bold" style={{ fontSize: '1rem' }}>will be available</label>
    </div>
    </div>
</div>
<div>
    <div>
        <p style={{ fontSize: '1.5rem' }}><b>Indication:</b> {medicine.indication}</p>
        <p style={{ fontSize: '1.5rem' }}><b>Dosage: </b>{medicine.dosage}</p>
        <p style={{ fontSize: '1.5rem' }}><b>Dosage Strength: </b>{medicine.dosagestrength}</p>
        <p style={{ fontSize: '1.5rem' }}><b>Cautions: </b>{medicine.cautions}</p>
    </div>
</div>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MEDSPECIFIC;
