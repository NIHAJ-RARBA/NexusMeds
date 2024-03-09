import React, { useEffect, useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Container } from 'reactstrap';
import PaginationBar from '../paginationBar'; // Import PaginationBar component

const CHEMRESULTSEARCH = () => {
    const [chemList, setChemList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [chemsPerPage] = useState(5); // Number of chemicals per page

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
    }, [currentPage]); // Add currentPage as a dependency

    const gotoSpecificChem = (chemical_id) => {
        window.location.href = `/specific_chemical/${chemical_id}`;
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container>
            <div style={{ marginTop: '115px' }}></div>
            {chemList.length === 0 && <h1>No chemicals found</h1>}

            <div className="row row-cols-1 row-cols-md-3">
                {chemList.map((chem) => (
                    <div key={chem.chemical_id} className="col mb-4">
                        <Card
                            className="h-100 medicine-box"
                            onClick={() => gotoSpecificChem(chem.chemical_id)}
                            style={{
                                borderRadius: '10px',
                                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardTitle tag="h5">
                                <b>{chem.chem_name}</b>
                            </CardTitle>
                            <CardImg
                                top
                                src={chem.image}
                                alt={`Image of ${chem.chem_name}`}
                                style={{
                                    flex: '1 1 auto',
                                    maxHeight: '200px',
                                    width: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                            <CardBody style={{ flex: '0 0 auto' }}>
                                <CardText>
                                    <b>Chemical ID:</b> {chem.chemical_id}
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <PaginationBar currentPage={currentPage} totalPages={Math.ceil(chemList.length / chemsPerPage)} paginate={paginate} />
        </Container>
    );
};

export default CHEMRESULTSEARCH;
