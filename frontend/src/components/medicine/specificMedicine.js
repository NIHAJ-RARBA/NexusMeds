import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const MEDSPECIFIC = ({ isLoggedIn, setAuth }) => {

    const loggedIn = isLoggedIn;

    const [customer_id, setCustomerId] = useState("");
    const [availability, setAvailability] = useState("");
    const [customer, setCustomer] = useState(true);
    const [generics, setGenerics] = useState([]);
    const [chemicals, setChemicals] = useState([]);




    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/customer/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });


            const parseRes = await res.json();
            // console.log(parseRes);
            // console.log(parseRes.customer_id);

            if (parseRes === 'No user found' || parseRes === null || parseRes === undefined || parseRes === "") {
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


            if (jsonData.manufacturer_id) {
                const responseForManufacturer = await fetch(`http://localhost:5000/manufacturer/${jsonData.manufacturer_id}`);
                const jsonDataForManufacturer = await responseForManufacturer.json();
                setManufacturer(jsonDataForManufacturer.manufacturer_name);
            }

            const genericsArray = jsonData.generic_name.split(',').map(item => item.trim());
            setGenerics(genericsArray);

            console.log(genericsArray);

            const response2 = await fetch(`http://localhost:5000/medicine/chemical/${id.id}`);
            const jsonData2 = await response2.json();
            console.log(jsonData2);

            //now for the all chemicals of this medicine match the chemical name with the generic name and store in the chemicals by order of generics

            const chemicalsArray = [];
            for (let i = 0; i < genericsArray.length; i++) {
                for (let j = 0; j < jsonData2.length; j++) {
                    if (jsonData2[j].chem_name === genericsArray[i]) {
                        chemicalsArray.push(jsonData2[j]);
                        break;
                    }
                }
            }

            setChemicals(chemicalsArray);


        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getProfile();
        getMedicine();
        getInventory();
    }, []);

    const addToCart = async () => {
        if (!loggedIn) {
            window.location.href = "/signin";
            return;
        }

        //console.log(`Added ${quantity} ${medicine.med_name}(s) to cart`);
        // console.log(`Added ${quantity} ${medicine.med_name}(s) to cart`);

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

            console.log(responseAddToCart);
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
            <h1 className="text-center mt-5">{medicine.med_name} {medicine.dosagestrength}</h1>
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
                                        {/* <div className="generes-wrap">
                                            <p className="generes ml-0"><strong>Generics:</strong><span className="font-weight-bold" style={{ fontSize: '1rem' }}>{medicine.generic_name}</span></p>
                                        </div> */}
                                        {
                                            !customer && chemicals.length>0 ? (
                                                <div style={{ fontSize: '1.5rem' }}>
                                                    <b>Generics: </b>
                                                    {chemicals.map((chemical, index) => (
                                                        <span key={index}>
                                                            <Link to={`/specificChemical/${chemical.chemical_id}`} style={{ textDecoration: 'underline', color: 'inherit' }}>
                                                                {chemical.chem_name}
                                                            </Link>
                                                            {index < chemicals.length - 1 && ', '}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : chemicals.length === 0 ? (
                                                <div style={{ fontSize: '1.5rem' }}>
                                                    <b>Generics: </b>
                                                    {
                                                        generics.map((chemical, index) => (
                                                            <span key={index}>
                                                                <Link to={`/specificChemical/-1`} style={{ textDecoration: 'underline', color: 'inherit' }}>
                                                                    {chemical}
                                                                </Link>
                                                                {index < generics.length - 1 && ', '}
                                                            </span>
                                                        ))
                                                    }

                                                </div>
                                            ) : (
                                                <div className="generes-wrap">
                                                    <p className="generes ml-0">
                                                        <strong>Generics:</strong>
                                                        <span className="font-weight-bold" style={{ fontSize: '1rem' }}>{medicine.generic_name}</span>
                                                    </p>
                                                </div>
                                            )
                                        }


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




// specific Chemical stored here

// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Card, Container, Row, Col, Button } from 'reactstrap';

// const SpecificChemical = () => {
//     const { id } = useParams();
//     const [chemical, setChemical] = useState({});
//     const [manufacturer, setManufacturer] = useState({});
//     const [parentChemical, setParentChemical] = useState({});

//     useEffect(() => {
//         const fetchChemicalData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/chemical/get/${id}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch chemical data');
//                 }
//                 const data = await response.json();
//                 setChemical(data);

//                 const manufacturerResponse = await fetch(`http://localhost:5000/manufacturer/${data.manufacturer_id}`);
//                 if (!manufacturerResponse.ok) {
//                     throw new Error('Failed to fetch manufacturer data');
//                 }
//                 const manufacturerData = await manufacturerResponse.json();
//                 setManufacturer(manufacturerData);

//                 if (data.parent_chemical_id !== null) {
//                     const parentChemicalResponse = await fetch(`http://localhost:5000/chemical/get/${data.parent_chemical_id}`);
//                     if (!parentChemicalResponse.ok) {
//                         throw new Error('Failed to fetch parent chemical data');
//                     }
//                     const parentChemicalData = await parentChemicalResponse.json();
//                     setParentChemical(parentChemicalData);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchChemicalData();
//     }, [id]);

//     return (
//         <div>
//             <h1 className="text-center mt-5">{chemical.chem_name}</h1>
//             <Container>
//                 <Row>
//                     <Col>
//                         <Card className="p-3">
//                             <div className="d-flex align-items-start">
//                                 <div className="border border-secondary rounded overflow-hidden mr-3" style={{ width: '400px', height: '400px' }}>
//                                     <img src={chemical.image} alt={`Image of ${chemical.chem_name}`} style={{ flex: '1 1 auto', maxHeight: '400px', width: '100%', objectFit: 'contain' }} />
//                                 </div>
//                                 <div id="product_details" className="d-flex flex-column" style={{ marginLeft: '40px', width: '500px' }}>
//                                     <div className="align-self-start">
//                                         <h6 className="text-secondary font-weight-bold" style={{ fontSize: '1.25rem' }}>Chemical Information</h6>
//                                         <TableRow label="Chemical Name" value={chemical.chem_name} />
//                                         <TableRow label="IUPAC Name" value={chemical.iupac_name} />
//                                         <TableRow label="Manufacturer" value={manufacturer.manufacturer_name} />
//                                         <TableRow label="Parent Chemical" value={parentChemical.chem_name ? <Link to={`/specificChemical/${parentChemical.chemical_id}`}>{parentChemical.chem_name}</Link> : 'NA'} />
//                                         <TableRow label="Chemical Formula" value={chemical.chemical_formula} />
//                                         <TableRow label="Description" value={chemical.description} />
//                                         <TableRow label="Molecular Weight" value={chemical.molecular_weight} />
//                                         <TableRow label="Price" value={chemical.price} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// // Custom TableRow component for consistent rendering
// const TableRow = ({ label, value }) => (
//     <div className="d-flex align-items-start mt-2">
//         <div className="font-weight-bold" style={{ minWidth: '200px', paddingRight: '10px', textAlign: 'right' }}>{label}:</div>
//         <div>{value}</div>
//     </div>
// );

// export default SpecificChemical;