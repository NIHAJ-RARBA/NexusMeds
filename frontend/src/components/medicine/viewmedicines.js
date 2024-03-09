import React, { useState, useEffect } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Container, Button, Row, Col } from "reactstrap";
import PaginationBar from "../paginationBar";

const VIEWMEDICINES = () => {
    const [medicineList, setMedicineList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [medicinesPerPage] = useState(12);

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

    // Logic for pagination
    const indexOfLastMedicine = currentPage * medicinesPerPage;
    const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
    const currentMedicines = medicineList.slice(indexOfFirstMedicine, indexOfLastMedicine);

    // Change page
    const paginate = pageNumber =>
    { setCurrentPage(pageNumber);
    window.scrollTo();
    };

    // Calculate total pages
    const totalPages = Math.ceil(medicineList.length / medicinesPerPage);

    // Calculate pages to show
    let startPage = currentPage - 5;
    let endPage = currentPage + 5;
    if (startPage <= 0) {
        startPage = 1;
    }
    if (endPage > totalPages) {
        endPage = totalPages;
    }
    const pageNumbersToShow = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbersToShow.push(i);
    }

    return (
        <Container>
            <div style={{ marginTop: '115px' }}></div>
            <h2 className="text-center mt-5"><u>Available Medicines</u></h2>
            <Row>
                <Col md={12}>
                    <Row className="row-cols-1 row-cols-md-4">
                        {currentMedicines.map((medicine) => (
                            <Col key={medicine.medicine_id} className="mb-4">
                                <Card className="h-100 medicine-box" onClick={() => gotoSpecificMedicine(medicine.medicine_id)} style={{ borderRadius: '10px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', height:'200px', width:'auto'}}>
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
                            </Col>
                        ))}
                    </Row>
                </Col>
                {/* <Col md={2}>
                    <div className="pagination-bar" style={{ position: 'fixed', top: '90px', right: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', height: 'calc(100vh - 100px)', paddingRight: '15px' }}>
                        <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={{ width: '100px' }}>Previous</Button>
                        {pageNumbersToShow.map(number => (
                            <Button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''} style={{ marginTop: '10px', marginBottom: '10px', width: '100px' }}>
                                {number}
                            </Button>
                        ))}
                        <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={{ width: '100px' }}>Next</Button>
                    </div>
                </Col> */}
                <Row>
                    <PaginationBar currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                </Row>
            </Row>

        </Container>
    );
};

export default VIEWMEDICINES;
