import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Container, Row, Col, Button } from 'reactstrap';

const SpecificChemical = () => {
    const { id } = useParams();
    const [chemical, setChemical] = useState({});
    const [manufacturer, setManufacturer] = useState({});
    const [parentChemical, setParentChemical] = useState({});
    const [researcher, setResearcher] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [inventory, setInventory] = useState({});
    const [availability, setAvailability] = useState("");
    const [researcherId, setResearcherId] = useState(0);

    useEffect(() => {
        fetchChemicalData();
        getInventory();
        getProfile();
    }, [id, chemical.researcher_id]);

    useEffect(() => {
        handleSetAvailability();
    }, [inventory]);

    const handleSetAvailability = () => {
        if (parseInt(inventory.stocked_amount) === 0) {
            setAvailability("Not Available");
        } else {
            setAvailability("Available");
        }
    }

    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/researcher/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();

            if (parseRes === 'No user found' || parseRes === null)
                setResearcher(false);

            setResearcherId(parseRes.researcher_id);

        } catch (error) {
            console.error(error.message);
        }
    }

    const fetchChemicalData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/chemical/get/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch chemical data');
            }
            const data = await response.json();
            setChemical(data);

            const manufacturerResponse = await fetch(`http://localhost:5000/manufacturer/${data.manufacturer_id}`);
            if (!manufacturerResponse.ok) {
                throw new Error('Failed to fetch manufacturer data');
            }
            const manufacturerData = await manufacturerResponse.json();
            setManufacturer(manufacturerData);

            if (data.parent_chemical_id !== null) {
                const parentChemicalResponse = await fetch(`http://localhost:5000/chemical/get/${data.parent_chemical_id}`);
                if (!parentChemicalResponse.ok) {
                    throw new Error('Failed to fetch parent chemical data');
                }
                const parentChemicalData = await parentChemicalResponse.json();
                setParentChemical(parentChemicalData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getInventory = async () => {
        try {
            const response = await fetch(`http://localhost:5000/inventory/chemical/${id}`);
            const jsonData = await response.json();
            setInventory(jsonData);

            if (jsonData.stocked_amount === 0) {
                setAvailability("Not Available");
            } else {
                setAvailability("Available");
            }
        } catch (error) {
            console.error(error.message);

        }
    };


    const addToCart = async () => {

        //console.log(`Added ${quantity} ${chemical.chem_name}(s) to cart`);

        const data = {
            user_id: researcherId,
            product_id: id,
            quantity: quantity
        };

        console.log(data);

        try {
            const responseAddToCart = await fetch("http://localhost:5000/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });


            const responseGetInventory = await fetch(`http://localhost:5000/inventory/chemical/${id}`);
            const jsonData2 = await responseGetInventory.json();
            setInventory(jsonData2);


            const parseRes = await responseAddToCart.json();
            console.log(parseRes);

            if (parseRes.error === '13891') {

                toast.error(`Available stock is less than the Quantity`, { autoClose: 2000, position: "top-center", hideProgressBar: true, pauseOnHover: false, draggable: true, progress: 0.00 });
            } else {

                toast.success("Added to cart successfully", { autoClose: 2000, position: "top-center", hideProgressBar: true, pauseOnHover: false, draggable: true, progress: 0.00 });
            }


            console.log(jsonData2.stocked_amount);

            if (parseInt(jsonData2.stocked_amount) === 0) {

                setAvailability("Not Available");
            } else {
                setAvailability("Available");
            }

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <ToastContainer />
            <div style={{ marginTop: '115px' }}></div>
            <h1 className="text-center mt-5">{chemical.chem_name}</h1>
            <Container>
                <Row>
                    <Col>
                        <Card className="p-3">
                            <div className="d-flex align-items-start">
                                <div className="border border-secondary rounded overflow-hidden mr-3" style={{ width: '400px', height: '400px' }}>
                                    <img src={chemical.image} alt={`Image of ${chemical.chem_name}`} style={{ flex: '1 1 auto', maxHeight: '400px', width: '100%', objectFit: 'contain' }} />
                                </div>
                                <div id="product_details" className="d-flex flex-column" style={{ marginLeft: '40px', width: '500px' }}>
                                    <div className="align-self-start">
                                        <h6 className="text-secondary font-weight-bold" style={{ fontSize: '1.25rem' }}>Chemical Information</h6>
                                        <div className="generes-wrap">
                                            <p className="generes ml-0"><strong>IUPAC Name :</strong><span className="font-weight-bold" style={{ fontSize: '1rem' }}>{chemical.iupac_name}</span></p>
                                        </div>
                                        <p className="generes ml-0"><strong>manufacturer :</strong><span className="font-weight-bold" style={{ fontSize: '1rem' }}>{manufacturer.manufacturer_name}</span></p>
                                    </div>
                                    <div className="align-self-start">
                                        <label className="">
                                            <span className="price-label font-weight-bold" style={{ fontSize: '1.25rem' }}>Price : ৳ </span>
                                            <label className="price font-weight-bold" style={{ fontSize: '1.25rem' }}>{chemical.price}</label>
                                            {/* <span className="regular-price font-weight-bold" style={{ fontSize: '1rem' }}>{medicine.regular_price}</span> */}
                                        </label>
                                        {researcher && (
                                            <div className="d-flex align-items-center mt-2">
                                                <Button onClick={addToCart} style={{ padding: '10px', margin: '10px', backgroundColor: 'rgb(226,135,67)' }}>Add to Cart</Button>
                                                <div className="input-group" style={{ width: '150px' }}>
                                                    <button className="btn btn-outline-secondary btn-lg" type="button" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} style={{ backgroundColor: 'rgb(6,57,112)' }}>-</button>
                                                    <input type="text" className="form-control text-center" value={quantity} readOnly style={{ width: '50px', fontSize: '0.9rem' }} />
                                                    <button className="btn btn-outline-secondary btn-lg" type="button" onClick={() => setQuantity(quantity + 1)} style={{ backgroundColor: 'rgb(6,57,112)' }}>+</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {researcher && (
                                    <div className="d-flex flex-column align-items-start" style={{ marginLeft: '40px' }}>
                                        <div id='availability'>
                                            <label className="font-weight-bold" style={{ fontSize: '1rem', backgroundColor: 'coral' }}>{availability}</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div>
                                    {
                                        chemical.parent_chemical_id ? (
                                            <p style={{ fontSize: '1.5rem' }}>
                                                <b>Parent Chemical : </b>
                                                <Link to={`/specificChemical/${chemical.parent_chemical_id}`} style={{ textDecoration: 'underline', color: 'inherit' }}>
                                                    {parentChemical.chem_name}
                                                </Link>
                                            </p>
                                        ) : null
                                    }
                                    <p style={{ fontSize: '1.5rem' }}><b>molecular_weight :</b> {chemical.molecular_weight}</p>
                                    <p style={{ fontSize: '1.5rem' }}><b>description : </b>{chemical.description}</p>
                                    <p style={{ fontSize: '1.5rem' }}><b>chemical formula : </b>{chemical.chemical_formula}</p>

                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SpecificChemical;
