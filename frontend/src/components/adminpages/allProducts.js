import React from "react";
import { useState, useEffect } from "react";
import { Alert, Container, Card, CardBody, CardImg, CardText, CardTitle, Button } from "reactstrap";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ALLPRODUCTS = () => {
    const [medicineList, setMedicineList] = useState([]);
    const [chemicalList, setChemicalList] = useState([]);

    const getProducts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/medicine/getAll`);
            const jsonData = await response.json();
            setMedicineList(jsonData);

            const response2 = await fetch(`http://localhost:5000/chemical/getAll`);
            const jsonData2 = await response2.json();
            setChemicalList(jsonData2);

        } catch (error) {
            console.error(error.message);
        }
    };

    const gotoSpecificMedicine = (medicine_id) => {
        console.log("Going to specific medicine with id:", medicine_id);
        window.location = `/admin_specificMed/${medicine_id}`;
    };

    const gotoSpecificChemical = (chemical_id) => {
        console.log("Going to specific chemical with id:", chemical_id);
        window.location = `/admin_specificChem/${chemical_id}`;
    };

    const handleAddMedicine = () => {
        window.location = "/add-medicine";
    };

    const handleAddChemical = () => {
        window.location = "/add-chemical";
    };



    useEffect(() => {
        getProducts();
    }, []);

    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "block",
                    background: "grey",
                    width: "30px",
                    height: "70px",
                    position: "absolute",
                    top: "50%",
                    left: "-30px",
                    transform: "translateY(-50%)",
                    zIndex: "1",
                }}
                onClick={onClick}
            >
                {"<"}
            </div>
        );
    };

    const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "block",
                    background: "grey",
                    width: "30px",
                    height: "70px",
                    position: "absolute",
                    top: "50%",
                    right: "-30px",
                    transform: "translateY(-50%)",
                    zIndex: "1",
                }}
                onClick={onClick}
            >
                {">"}
            </div>
        );
    };

    var settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        initialSlide: 0,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <Container style={{ height: "500px" }}>
            <div style={{ marginTop: "60px" }}></div>
            <Alert color="warning" className="text-center mt-3" style={{ height: "80px", fontSize: "40px" }}>
                All Products
            </Alert>

            <Alert color="info" className="text-center mt-3" style={{ height: "50px" }}> <h4>Medicines </h4></Alert>
            <Slider {...settings}>
                {medicineList.map((medicine) => (
                    <div key={medicine.medicine_id} className="col mb-4">
                        <Card
                            className="h-100 medicine-box"
                            onClick={() => gotoSpecificMedicine(medicine.medicine_id)}
                            style={{
                                borderRadius: "10px",
                                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            <CardImg
                                top
                                src={medicine.image}
                                alt={`Image of ${medicine.med_name}`}
                                style={{
                                    height: "180px",
                                    width: "100%",
                                    objectFit: "contain",
                                    borderBottom: "1px solid #dee2e6",
                                }}
                            />
                            <CardBody style={{ overflow: "hidden", maxHeight: "150px" }}>
                                <CardTitle tag="h5">
                                    <b>
                                        {medicine.med_name} {medicine.dosagestrength}
                                    </b>
                                </CardTitle>
                                <CardText>
                                    {/* <b>Generic Name:</b> {medicine.generic_name} <br /> */}
                                    <b>Package Type:</b> {medicine.package_type} <br />
                                    <b>Price:</b> {medicine.price} <br />
                                </CardText>
                                <Button color="primary" onClick={() => gotoSpecificMedicine(medicine.medicine_id)}>
                                    View Details
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </Slider>

            <Button color="success" onClick={handleAddMedicine}  style={{ marginTop: "20px" }}>Add Medicine</Button>
            
            <Alert color="info" className="text-center mt-3" style={{ height: "50px" }}> <h4> Chemicals </h4></Alert>
            <Slider {...settings}>
                {chemicalList.map((chemical) => (
                    <div key={chemical.chemical_id} className="col mb-4">
                        <Card
                            className="h-100 medicine-box"
                            onClick={() => gotoSpecificChemical(chemical.chemical_id)}
                            style={{
                                borderRadius: "10px",
                                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            <CardImg
                                top
                                src={chemical.image}

                                alt={`Image of ${chemical.chem_name}`}

                                style={{
                                    height: "200px",
                                    width: "100%",
                                    objectFit: "contain",
                                    borderBottom: "1px solid #dee2e6",
                                }}
                            />
                            <CardBody style={{ overflow: "hidden", maxHeight: "150px" }}>
                                <CardTitle tag="h5">
                                    <b>

                                        {chemical.chem_name}
                                    </b>
                                </CardTitle>
                                <CardText>

                                    <b>Price:</b> {chemical.price} <br />
                                </CardText>
                                <Button color="primary" onClick={() => gotoSpecificChemical(chemical.chemical_id)}>
                                    View Details
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </Slider>

            <Button color="success" onClick={handleAddChemical} style={{ marginTop: "20px" }}>Add Chemical</Button>


        </Container>
    );
};

export default ALLPRODUCTS;
