import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, CardImg, Col, Row, Container } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { Input } from 'reactstrap';
import { toast } from 'react-toastify';
const moment = require('moment');

const SpecificOrderPage = () => {
    const location = useLocation();
    const { order: initialOrder, isCustomer } = location.state;
    const [order, setOrder] = useState(initialOrder);

    const [imageSrc, setImageSrc] = useState(null);

    const [CART, setCART] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [medItems, setMedItems] = useState([]);
    const [chemItems, setChemItems] = useState([]);
    const [daysToDelay, setDaysToDelay] = useState();

    useEffect(() => {
        if (order.prescription) {
            setImageSrc(order.prescription);
        }
    }, [order.prescription]);

    useEffect(() => {
        getBigCart();
    }, [order.cart_id]);

    useEffect(() => {
        if (CART && CART.iscustomer) {
            getMedList();
        } else if (CART && !CART.iscustomer) {
            getChemList();
        }
    }, [CART]);

    useEffect(() => {
        getCartList();
    }, []);

    const getCartList = async () => {
        try {
            const response = await fetch(`http://localhost:5000/cart/get-cart-id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({ cart_id: order.cart_id }),
            });

            const jsonData = await response.json();

            let sortedCartItems = jsonData.sort((a, b) => a.medicine_id - b.medicine_id);

            setCartItems(sortedCartItems);

        } catch (error) {
            console.error(error.message);
        }
    };

    const getBigCart = async () => {
        try {
            const response = await fetch(`http://localhost:5000/cart/get-big-cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({ cart_id: order.cart_id }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart data');
            }

            const jsonData = await response.json();
            setCART(jsonData);

        } catch (error) {
            console.error(error.message);
        }
    };

    const getMedList = async () => {
        const arr = [];
        try {
            for (let i = 0; i < cartItems.length; i++) {
                const resp = await fetch(`http://localhost:5000/medicine/get/${cartItems[i].medicine_id}`);
                const json = await resp.json();
                arr.push(json);
            }
            setMedItems(arr);
        } catch (error) {
            console.error(error.message);
        }
    };

    const getChemList = async () => {
        const arr = [];
        try {
            for (let i = 0; i < cartItems.length; i++) {
                const resp = await fetch(`http://localhost:5000/chemical/get/${cartItems[i].chemical_id}`);
                const json = await resp.json();
                arr.push(json);
            }
            setChemItems(arr);
        } catch (error) {
            console.error(error.message);
        }
    };

    const approveOrder = async () => {
        try {

            const checkAvailability = await fetch(`http://localhost:5000/inventory/checkAvailability`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({
                    order_id: order.order_id,
                    myCustomer: isCustomer
                })
            });

            const parseCheckAvailability = await checkAvailability.json();

            console.log(parseCheckAvailability);

            if (parseCheckAvailability.error === '56789') {

                toast.error('Product Stock is not enough to fulfill the order');
                return;
            } else {

                const response = await fetch(`http://localhost:5000/order/setStatus`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify({
                        order_id: order.order_id
                    })
                });

                const jsonData = await response.json();
                console.log(jsonData);

                window.location.href = '/approve/orders'; // Redirect to admin orders page
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const rejectOrder = async () => {
        try {
            const response = await fetch(`http://localhost:5000/order/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({
                    order_id: order.order_id
                })
            });

            const jsonData = await response.json();
            console.log(jsonData);

        } catch (error) {
            console.error(error.message);
        }
    }

    const handleApprove = () => {
        approveOrder();
        console.log('Order Approved:', order);
    };

    const handleReject = () => {
        rejectOrder();
        window.location.href = '/approve/orders';
        console.log('Order Rejected:', order);
    };

    const handleDelay = async () => {
        try {


            if (daysToDelay === null || daysToDelay === undefined || daysToDelay === "") {
                setDaysToDelay(0);
            }

            const response = await fetch(`http://localhost:5000/order/delay`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({
                    order_id: order.order_id,
                    days: daysToDelay
                })
            });

            if (daysToDelay > 0) {
                toast.success(`Order delayed by ${daysToDelay} days`);
            }

            const updatedOrder = await fetch(`http://localhost:5000/order/getOrderById`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({
                    order_id: order.order_id
                })
            });

            //format by moment the updated order date
            const jsonData2 = await updatedOrder.json();
            console.log(jsonData2);


            const formattedUpdatedOrder = {
                ...jsonData2,
                order_date: moment(jsonData2.order_date).format('YYYY-MM-DD'),
                shipment_date: moment(jsonData2.shipment_date).format('YYYY-MM-DD'),
            };
           
            setOrder(formattedUpdatedOrder);

            const jsonData = await response.json();
            console.log(jsonData);

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Container>
            <h1>Order Details</h1>
            <Row>
                {/* Order Details */}
                <Col md={6}>
                    <Card style={{ marginBottom: '10px' }}>
                        <CardBody>
                            <CardTitle>Order ID: {order.order_id}</CardTitle>
                            <CardText>Price: {order.price}</CardText>
                            <CardText>Billing Address: {order.billing_address}</CardText>
                            <CardText>Order Date: {order.order_date}</CardText>
                            <CardText>Delivery Date: {order.shipment_date}</CardText>
                            {imageSrc && <CardImg src={imageSrc} alt="Prescription" style={{ width: '500px', height: 'auto' }} />}
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <Button onClick={() => handleApprove()} style={{ marginRight: '10px' }}>Approve</Button>
                                <Input
                                    type="number"
                                    value={daysToDelay}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        // Ensure value is not negative
                                        if (value < 0) {
                                            value = 0;
                                        }
                                        setDaysToDelay(value);
                                    }}
                                    placeholder="Days"
                                    style={{ marginRight: '10px', width: '100px' }}
                                />
                                <Button onClick={() => handleDelay()} style={{ marginRight: '10px' }}>Delay</Button>
                                <Button onClick={() => handleReject()}>Reject</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                {/* Medication Items */}
                <Col>
                    <Col>
                        {
                            CART && CART.iscustomer ? (
                                medItems.map(item => (
                                    <Row key={item.medicine_id} md={4}>
                                        <Card className="mb-3" style={{ display: 'flex', flexDirection: 'row', height: '200px', width: '100%' }}>
                                            <CardImg
                                                top
                                                width="30%"
                                                src={item.image}
                                                alt={item.med_name}
                                                style={{ height: '100%', width: '200px' }}
                                                onLoad={() => {
                                                    // Force re-render when the image is loaded
                                                    setMedItems(prevState => [...prevState]);
                                                }}
                                            />
                                            <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>
                                                    <CardTitle tag="h5">{item.med_name}</CardTitle>
                                                    <CardText style={{ backgroundColor: !item.isotc ? 'hotpink' : 'lightgreen' }}>{item.isotc ? 'OTC' : 'Prescribed'}</CardText>
                                                    <CardText>Strength: {item.dosagestrength}</CardText>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Row>
                                ))
                            ) : (
                                chemItems.map(item => (
                                    <Row key={item.chemical_id} md={4}>
                                        <Card className="mb-3" style={{ display: 'flex', flexDirection: 'row', height: '200px', width: '100%' }}>
                                            <CardImg
                                                top
                                                width="30%"
                                                src={item.image}
                                                alt={item.chem_name}
                                                style={{ height: '100%', width: '200px' }}
                                                onLoad={() => {
                                                    // Force re-render when the image is loaded
                                                    setChemItems(prevState => [...prevState]);
                                                }}
                                            />
                                            <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>
                                                    <CardTitle tag="h5">{item.chem_name}</CardTitle>
                                                    {/* <CardText style={{ backgroundColor: !item.isotc ? 'hotpink' : 'lightgreen' }}>{item.isotc ? 'OTC' : 'Prescribed'}</CardText>
                                                    <CardText>Strength: {item.dosagestrength}</CardText> */}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Row>
                                ))
                            )
                        }
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default SpecificOrderPage;
