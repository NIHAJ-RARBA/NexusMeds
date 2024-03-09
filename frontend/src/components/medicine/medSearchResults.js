import React, { useEffect, useState } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Container } from "reactstrap";
import PaginationBar from "../paginationBar";

const SEARCHRESULTS = () => {
    const [medicineList, setMedicineList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [medicinesPerPage] = useState(6); // Number of medicines per page

    useEffect(() => {
        const fetchMedicineList = async () => {
            const storedMedicineList = localStorage.getItem("searchResults");
            if (storedMedicineList) {
                try {
                    const parsedMedicineList = JSON.parse(storedMedicineList);
                    setMedicineList(parsedMedicineList);
                } catch (error) {
                    console.error("Error parsing medicine list:", error);
                }
            }
        };

        fetchMedicineList();
    }, []);

    // Calculate current medicines
    const indexOfLastMedicine = currentPage * medicinesPerPage;
    const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
    const currentMedicines = medicineList.slice(indexOfFirstMedicine, indexOfLastMedicine);

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const gotoSpecificMedicine = (medicine_id) => {
        console.log("Going to specific medicine with id:", medicine_id);
        window.location = `/specificmedicine/${medicine_id}`;
    };

    return (
        <Container className="SEARCHRESULTS">
            <div style={{ marginTop: "115px" }}></div>
            <div className="row row-cols-1 row-cols-md-3">
                {currentMedicines.map((medicine) => (
                    <div key={medicine.medicine_id} className="col mb-4">
                        <Card
                            className="h-100 medicine-box"
                            onClick={() => gotoSpecificMedicine(medicine.medicine_id)}
                            style={{
                                borderRadius: "10px",
                                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardTitle tag="h5">
                                <b>
                                    {medicine.med_name} {medicine.dosagestrength}
                                </b>
                            </CardTitle>
                            <CardImg
                                top
                                src={medicine.image}
                                alt={`Image of ${medicine.med_name}`}
                                style={{
                                    flex: "1 1 auto",
                                    maxHeight: "200px",
                                    width: "100%",
                                    objectFit: "contain",
                                }}
                            />
                            <CardBody style={{ flex: "0 0 auto" }}>
                                <CardText>
                                    <b>Generic Name:</b> {medicine.generic_name} <br />
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <PaginationBar currentPage={currentPage} totalPages={Math.ceil(medicineList.length / medicinesPerPage)} paginate={paginate} />
        </Container>
    );
};

export default SEARCHRESULTS;
