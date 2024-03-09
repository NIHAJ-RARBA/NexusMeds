import React, { useState, useEffect } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Container } from "reactstrap";
import PaginationBar from "../paginationBar";

const VIEWCHEMICALS = () => {
    const [chemicalList, setChemicalList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [chemicalsPerPage] = useState(9); // Adjust as needed

    const getChemicals = async () => {
        try {
            const response = await fetch(`http://localhost:5000/chemical/getall?page=${currentPage}&limit=${chemicalsPerPage}`);
            const jsonData = await response.json();
            setChemicalList(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const gotoSpecificChemical = (chemical_id) => {
        console.log('Going to specific chemical with id:', chemical_id);
        window.location = `/specificChemical/${chemical_id}`;
    };

    useEffect(() => {
        getChemicals();
    }, [currentPage]); // Fetch chemicals when the currentPage changes

    // Calculate total pages
    const totalPages = Math.ceil(chemicalList.length / chemicalsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <Container>
            <div style={{ marginTop: '115px' }}></div>
            <h2 className="text-center mt-5"><u>Available Chemicals</u></h2>
            <div className="row row-cols-1 row-cols-md-3">
                {chemicalList.map((chemical) => (
                    <div key={chemical.chemical_id} className="col mb-4">
                        <Card className="h-100 medicine-box" onClick={() => gotoSpecificChemical(chemical.chemical_id)} style={{ borderRadius: '10px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column' }}>
                            <CardImg top src={chemical.image} alt={`Image of ${chemical.chem_name}`} style={{ flex: '1 1 auto', maxHeight: '200px', width: '100%', objectFit: 'contain' }} />
                            <CardBody style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <CardTitle tag="h5"><b>{chemical.chem_name}</b></CardTitle>
                                <CardText>
                                    <b>IUPAC Name :</b> {chemical.iupac_name} <br />
                                    <b>Chemical Formula:</b> {chemical.chemical_formula} <br />
                                    <b>Price:</b> {chemical.price} <br />
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
            <PaginationBar currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </Container>
    );
};

export default VIEWCHEMICALS;
