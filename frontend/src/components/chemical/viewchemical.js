import React, { useState, useEffect } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Container } from "reactstrap";

const VIEWCHEMICALS = () => {
    const [chemicalList, setChemicalList] = useState([]);

    const getChemicals = async () => {
        try {
            const response = await fetch("http://localhost:5000/chemical/getall");
            const jsonData = await response.json();
            setChemicalList(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const gotoSpecificChemical = (chemical_id) => {
        console.log('Going to specific chemical with id:', chemical_id);
        window.location = `/specificchemical/${chemical_id}`;
    };

    useEffect(() => {
        getChemicals();
    }, []);

    return (
        <Container>
            <div style={{ marginTop: '115px' }}></div>
            <h2 className="text-center mt-5"><u>Available Chemicals</u></h2>
            <div className="row row-cols-1 row-cols-md-3">
    {chemicalList.map((chemical) => (
        <div key={chemical.chemical_id} className="col mb-4">
            <Card className="h-100 medicine-box" onClick={() => gotoSpecificChemical(chemical.chemical_id)} style={{ borderRadius: '10px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)', display: 'flex', flexDirection: 'column' }}>
                <CardImg top src={chemical.image} alt={`Image of ${chemical.chem_name}`} style={{ flex: '1 1 auto', maxHeight: '200px', width: '100%', objectFit: 'contain' }} />
                <CardBody style={{ flex: '0 0 auto' }}>
                    <CardTitle tag="h5"><b>{chemical.chem_name}</b></CardTitle>
                    <CardText>
                        <b>Chemical Formula:</b> {chemical.chem_formula} <br />
                        <b>Price:</b> {chemical.price} <br />
                        <b>Available as:</b> {chemical.chem_type} <br />
                    </CardText>
                </CardBody>
            </Card>
        </div>
    ))}
</div>
</Container>
    );
};

export default VIEWCHEMICALS;


