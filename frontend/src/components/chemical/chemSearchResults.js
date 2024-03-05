import React, { useEffect, useState } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Container } from "reactstrap";

const CHEMRESULTSEARCH = () => {
    const [chemList, setChemList] = useState([]);

    useEffect(() => {
        const fetchChemList = async () => {
            const storedChemList = localStorage.getItem('searchResults');
            if (storedChemList) {
                try {
                    const parsedChemList = JSON.parse(storedChemList);
                    setChemList(parsedChemList);
                } catch (error) {
                    console.error('Error parsing chem list:', error);
                }
            }
        };

        fetchChemList();
    }   , []);

    const gotoSpecificChem = (chemical_id) => {
        window.location.href = `/specific_chemical/${chemical_id}`;
    }

    return (
        <Container>
            <div style={{ marginTop: "115px" }}></div>
            {chemList.length === 0 && <h1>No chemicals found</h1>}

            <div className="row row-cols-1 row-cols-md-3">
                {chemList.map((chem) => (
                    <div key={chem.chemical_id} className="col mb-4">
                        <Card
                            className="h-100 medicine-box"
                            onClick={() => gotoSpecificChem(chem.chemical_id)}
                            style={{
                                borderRadius: "10px",
                                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardTitle tag="h5">
                                <b>
                                    {chem.chem_name}
                                </b>
                            </CardTitle>
                            <CardImg
                                top
                                src={chem.image}
                                alt={`Image of ${chem.chem_name}`}
                                style={{
                                    flex: "1 1 auto",
                                    maxHeight: "200px",
                                    width: "100%",
                                    objectFit: "contain",
                                }}
                            />
                            <CardBody style={{ flex: "0 0 auto" }}>
                                <CardText>
                                    <b>Chemical ID:</b> {chem.chemical_id}
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>

        </Container>
    );

}

export default CHEMRESULTSEARCH;