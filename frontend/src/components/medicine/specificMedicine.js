import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Container, Row, Col, Button } from 'reactstrap';

const MEDSPECIFIC = ({ isLoggedIn, setAuth }) => {

    const loggedIn = isLoggedIn;

    const [customer_id, setCustomerId] = useState("");
    const [availability, setAvailability] = useState("");
    const [customer, setCustomer] = useState(true);


    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/customer/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            // console.log(parseRes);
            // console.log(parseRes.customer_id);

            if (parseRes === 'No user found' || parseRes === null || parseRes === undefined || parseRes === "")
            {
                setCustomer(false);
                console.log("No user found");
            }

            setCustomerId(parseRes.customer_id);

            



        } catch (error) {
            console.error(error.message);
        }
    }

    const id = useParams();

    const [medicine, setMedicine] = useState({});
    const [manufacturer, setManufacturer] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [inventory, setInventory] = useState({});

    const getInventory = async () => {
        try {
            const response = await fetch(`http://localhost:5000/inventory/medicine/${id.id}`);
            const jsonData = await response.json();
            setInventory(jsonData);

            if (jsonData.stocked_amount === "0") {
                setAvailability("Not Available");
            }
            else {
                setAvailability("Available");
            }


            console.log(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };



    const getMedicine = async () => {
        try {
            const response = await fetch(`http://localhost:5000/medicine/get/${id.id}`);
            const jsonData = await response.json();
            setMedicine(jsonData);

            // console.log(jsonData);

            if (jsonData.manufacturer_id) {
                const responseForManufacturer = await fetch(`http://localhost:5000/manufacturer/${jsonData.manufacturer_id}`);
                const jsonDataForManufacturer = await responseForManufacturer.json();
                setManufacturer(jsonDataForManufacturer.manufacturer_name);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getProfile();
        // console.log(customer_id);
        getMedicine();
        getInventory();
    }, []);

    const addToCart = async () => {
        if (!loggedIn) {
            window.location.href = "/signin";
            return;
        }
    
        console.log(`Added ${quantity} ${medicine.med_name}(s) to cart`);
    
        const data = {
            user_id: customer_id,
            product_id: id.id,
            quantity: quantity
        };
    
        try {
            const responseAddToCart = await fetch("http://localhost:5000/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            toast.success("Added to cart successfully", { autoClose: 2000, position: "top-center", hideProgressBar: true, pauseOnHover: false, draggable: true, progress: 0.00 });

            const parseRes = await responseAddToCart.json();
            console.log(parseRes);
    
            const responseGetInventory = await fetch(`http://localhost:5000/inventory/medicine/${id.id}`);
            const jsonData2 = await responseGetInventory.json();
            setInventory(jsonData2);

            // console.log(jsonData2);
    
            if (jsonData2.stocked_amount === "0") {
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
            <h1 className="text-center mt-5">{medicine.med_name}</h1>
            <Container>
                <Row>
                    <Col>
                        <Card className="p-3">
                            <div className="d-flex align-items-start">
                                <div className="border border-secondary rounded overflow-hidden mr-3" style={{ width: '400px', height: '400px' }}>
                                    <img src={medicine.image} alt={`Image of ${medicine.med_name}`} style={{ flex: '1 1 auto', maxHeight: '400px', width: '100%', objectFit: 'contain' }} />
                                </div>
                                <div id="product_details" className="d-flex flex-column" style={{ marginLeft: '40px', width: '500px' }}>
                                    <div className="align-self-start">
                                        <h6 className="text-secondary font-weight-bold" style={{ fontSize: '1.25rem' }}>{medicine.med_form}</h6>
                                        <div className="generes-wrap">
                                            <p className="generes ml-0"><strong>Generics:</strong><span className="font-weight-bold" style={{ fontSize: '1rem' }}>{medicine.generic_name}</span></p>
                                        </div>
                                        <p className="manufacturer" style={{ fontSize: '1rem' }}>{manufacturer && <span className="font-weight-bold">{manufacturer}</span>}</p>
                                    </div>
                                    <div className="align-self-start">
                                        <label className="">
                                            <span className="price-label font-weight-bold" style={{ fontSize: '1.25rem' }}>Price : ৳ </span>
                                            <label className="price font-weight-bold" style={{ fontSize: '1.25rem' }}>{medicine.price}</label>
                                            <span className="regular-price font-weight-bold" style={{ fontSize: '1rem' }}>{medicine.regular_price}</span>
                                        </label>
                                        {customer && (
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
                                {customer && (
                                    <div className="d-flex flex-column align-items-start" style={{ marginLeft: '40px' }}>
                                        <div id="prescription">
                                            {medicine.isotc ? (
                                                <label className="font-weight-bold" style={{ fontSize: '1rem', backgroundColor: 'lightgreen' }}>Prescription Not Required</label>
                                            ) : (
                                                <label className="font-weight-bold" style={{ fontSize: '1rem', backgroundColor: 'khaki' }}>Prescription Required</label>
                                            )}
                                        </div>
                                        <div id='availability'>
                                            <label className="font-weight-bold" style={{ fontSize: '1rem', backgroundColor: 'coral' }}>{availability}</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div>
                                    <p style={{ fontSize: '1.5rem' }}><b>Indication:</b> {medicine.indication}</p>
                                    <p style={{ fontSize: '1.5rem' }}><b>Dosage: </b>{medicine.dosage}</p>
                                    <p style={{ fontSize: '1.5rem' }}><b>Dosage Strength: </b>{medicine.dosagestrength}</p>
                                    <p style={{ fontSize: '1.5rem' }}><b>Cautions: </b>{medicine.cautions}</p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MEDSPECIFIC;
