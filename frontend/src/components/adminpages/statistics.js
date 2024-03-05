import React from "react";
import { useState, useEffect } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Container } from "reactstrap";

const STATISTICS = () => {
    const [totalMedicines, setTotalMedicines] = useState(0);
    const [totalChemicals, setTotalChemicals] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalResearchers, setTotalResearchers] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    const [totalMedicineRatings, setTotalMedicineRatings] = useState(0);
    const [totalChemicalRatings, setTotalChemicalRatings] = useState(0);
    const [totalMedicineReviews, setTotalMedicineReviews] = useState(0);
    const [totalChemicalReviews, setTotalChemicalReviews] = useState(0);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const res = await fetch(`http://localhost:5000/admin/statistics`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await res.json();
                console.log(parseRes);

                setTotalMedicines(parseRes.medicineCount);
                setTotalChemicals(parseRes.chemicalCount);
                setTotalUsers(parseRes.userCount);
                setTotalAdmins(parseRes.adminCount);
                setTotalResearchers(parseRes.researcherCount);
                setTotalReviews(parseRes.reviewCount);
                setTotalRatings(parseRes.ratingCount);
                setTotalMedicineRatings(parseRes.medicineRatingCount);
                setTotalChemicalRatings(parseRes.chemicalRatingCount);
                setTotalMedicineReviews(parseRes.medicineReviewCount);
                setTotalChemicalReviews(parseRes.chemicalReviewCount);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <Container>
            <div style={{ marginTop: "115px" }}></div>
            <h1>Statistics</h1>
            <div className="row row-cols-1 row-cols-md-2">
                <div className="col mb-4">
                    <Card
                        className="h-100 medicine-box"
                        style={{
                            borderRadius: "10px",
                            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            flexDirection: "column",

                        }}
                    >
                        <CardTitle tag="h5">
                            <b>
                                Total Medicines: {totalMedicines}
                            </b>
                        </CardTitle>
                    </Card>
                </div>

                <div className="col mb-4">
                    <Card
                        className="h-100 medicine-box"
                        style={{
                            borderRadius: "10px",
                            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CardTitle tag="h5">
                            <b>
                                Total Chemicals: {totalChemicals}
                            </b>
                        </CardTitle>
                    </Card>
                </div>

                <div className="col mb-4">
                    <Card
                        className="h-100 medicine-box"
                        style={{
                            borderRadius: "10px",
                            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CardTitle tag="h5">
                            <b>
                                Total Users: {totalUsers}
                            </b>
                        </CardTitle>
                    </Card>
                </div>

                <div className="col mb-4">
                    <Card
                        className="h-100 medicine-box"
                        style={{
                            borderRadius: "10px",
                            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CardTitle tag="h5">
                            <b>
                                Total Admins: {totalAdmins}
                            </b>
                        </CardTitle>
                    </Card>

                </div>


                <div className="col mb-4">
                    <Card
                        className="h-100 medicine-box"
                        style={{
                            borderRadius: "10px",
                            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CardTitle tag="h5">
                            <b>
                                Total Researchers: {totalResearchers}
                            </b>
                        </CardTitle>
                    </Card>

                </div>


            </div>
        </Container>
    );
}

export default STATISTICS;