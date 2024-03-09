import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardImg, CardText, CardBody, CardTitle, Container } from "reactstrap";
import PaginationBar from "../paginationBar";
import { useParams } from "react-router-dom";

const VIEWOTC = () => {
    const [medicineList, setMedicineList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [medicinesPerPage] = useState(9); // Adjust as needed
    const indication = useParams();

    const getMedicinesByIndication = async (indication) => {
        try {
            const response = await fetch(`http://localhost:5000/medicine/isOTC/true/indications/${indication}`);
            const jsonData = await response.json();
            console.log('Medicines for indication:', indication, jsonData);
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
        getMedicinesByIndication(indication.indication);
    }, [indication]);

    // Logic for pagination
    const indexOfLastMedicine = currentPage * medicinesPerPage;
    const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
    const currentMedicines = medicineList.slice(indexOfFirstMedicine, indexOfLastMedicine);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(medicineList.length / medicinesPerPage);

    return (
        <Container>
        <div className="VIEWOTC">
            <div style={{ marginTop: '115px' }}></div>
            <Row xs="1" sm="2" md="3">
                {currentMedicines.map((medicine) => (
                    <Col key={medicine.medicine_id} className="mt-4">
                        <Card className="h-100 medicine-box" onClick={() => gotoSpecificMedicine(medicine.medicine_id)} style={{ borderRadius: '10px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', marginBottom: '20px'}}>
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
            <PaginationBar currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
        </Container>
    );
};

export default VIEWOTC;
