import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col, Input, Form } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const CART = () => {
    const [customer_id, setCustomerId] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [medItems, setMedItems] = useState([]);
    // const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();

    const location = useLocation();
    const param = new URLSearchParams(location.search).get("param");

    useEffect(() => {
        if (param === "true") {
            console.log('param is true');
            for (let i = 0; i < cartItems.length; i++) {
                removeFromCart(cartItems[i].medicine_id);
            }
        }
    }, [param, cartItems]);

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (customer_id !== "") {
            getCartList();
        }
    }, [customer_id]);

    useEffect(() => {
        if (cartItems.length > 0) {
            getMedList();
        }
    }, [cartItems]);

    useEffect(() => {
        calculateSubtotal();
    }, [quantity]);

    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/customer/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });
            const parseRes = await res.json();
            setCustomerId(parseRes.customer_id);

        } catch (error) {
            console.error(error.message);
        }
    };

    const getCartList = async () => {
        try {
            const response = await fetch(`http://localhost:5000/cart/get`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({ user_id: customer_id })
            });
            const jsonData = await response.json();
            const sortedCartItems = jsonData.sort((a, b) => a.medicine_id - b.medicine_id);
            setCartItems(sortedCartItems);
        } catch (error) {
            console.error(error.message);
        }
    };

    const getMedList = async () => {
        const arr = [];
        const quantityObj = {};
        try {
            for (let i = 0; i < cartItems.length; i++) {
                const resp = await fetch(`http://localhost:5000/medicine/get/${cartItems[i].medicine_id}`);
                const json = await resp.json();
                arr.push(json);
                quantityObj[json.medicine_id] = cartItems[i].quantity;
            }
            setMedItems(arr);
            setQuantity(quantityObj);
        } catch (error) {
            console.error(error.message);
        }
    }

    const removeFromCart = async (itemId) => {
        try {
            await fetch(`http://localhost:5000/cart/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({ user_id: customer_id, product_id: itemId, quantity: quantity[itemId] })
            });
            const newCartItems = cartItems.filter(item => item.medicine_id !== itemId);
            setCartItems(newCartItems);

            // Check if cart will be empty, if so, clear the cart
            if (newCartItems.length === 0) {
                
                
                setMedItems([]);
                setQuantity({});
                setSubtotal(0);

                window.location.href = "/cart";
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const placeOrder = (medItems, quantity, user_id) => {

        //console.log('recieved id in cart:', user_id);

        // navigate('/placeorder', { state: { medItems: medItems } });
        navigate('/placeorder', { state: { medItems: medItems, quantity: quantity, user_id: user_id } });
    };

    const handleQuantityChange = async (medicine_id, newQuantity) => {
        try {
            // Check the current quantity in the cart
            const currentQuantity = quantity[medicine_id];
            // Calculate the quantity difference
            const quantityDifference = newQuantity - currentQuantity;

            // Update quantity state
            setQuantity(prevQuantity => ({
                ...prevQuantity,
                [medicine_id]: newQuantity
            }));

            // Update cartItems state
            const updatedCartItems = cartItems.map(item => {
                if (item.medicine_id === medicine_id) {
                    return {
                        ...item,
                        quantity: newQuantity
                    };
                }
                return item;
            });
            setCartItems(updatedCartItems);

            // Add or remove items from the cart in the database based on quantity difference
            if (quantityDifference > 0) {
                await fetch(`http://localhost:5000/cart/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify({ user_id: customer_id, product_id: medicine_id, quantity: quantityDifference })
                });
            } else if (quantityDifference < 0) {
                await fetch(`http://localhost:5000/cart/remove`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify({ user_id: customer_id, product_id: medicine_id, quantity: -quantityDifference })
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const calculateSubtotal = () => {
        let subTotal = 0;
        medItems.forEach(item => {
            subTotal += item.price * quantity[item.medicine_id];
        });
        setSubtotal(subTotal);
    };

    const gotohome = () => {
        window.location.href = "/";
    }

    return (
        <Container>
            {/* <div style={{ marginTop: '115px' }}></div> */}
            <h1 className="text-center mt-5">Your Cart</h1>
            <Col>
                {medItems.map(item => (
                    <Row key={item.medicine_id} md={4}>
                        <Card className="mb-3" style={{ display: 'flex', flexDirection: 'row', height: '200px', width: '700px' }}>
                            <CardImg top width="30%" src={item.image} alt={item.med_name} style={{ height: '100%', width: '200px' }} />
                            <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <CardTitle tag="h5">{item.med_name}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Total Price: ${(item.price * quantity[item.medicine_id]).toFixed(2)}</CardSubtitle>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <Button color="secondary" onClick={() => handleQuantityChange(item.medicine_id, quantity[item.medicine_id] - 1)}>-</Button>
                                    <Input type="text" value={quantity[item.medicine_id]} onChange={(e) => handleQuantityChange(item.medicine_id, parseInt(e.target.value))} />
                                    <Button color="secondary" onClick={() => handleQuantityChange(item.medicine_id, quantity[item.medicine_id] + 1)}>+</Button>
                                </div>
                                <Button color="danger" onClick={() => removeFromCart(item.medicine_id)}>Remove</Button>
                            </CardBody>
                        </Card>
                    </Row>
                ))}
            </Col>

            {medItems.length > 0 ? (
                <Col>
                    <Card className="mb-3" style={{ width: '400px', marginTop: '20px', marginLeft: 'auto', position: 'fixed', right: '30px', top: '200px' }}>
                        <CardBody>
                            <CardTitle tag="h5" style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>Total</CardTitle>
                            <CardSubtitle tag="h6" className="mb-4" style={{ fontWeight: 'bold' }}> &#2547;{subtotal.toFixed(2)}</CardSubtitle>
                            <div className="d-flex justify-content-between">
                                {/* <Button color="success" onClick={placeOrder(medItems)}  style={{ width: '45%' }}>Place Order</Button> */}
                                <Button color="success" onClick={() => placeOrder(medItems, quantity, customer_id)} style={{ width: '45%' }}>Place Order</Button>
                                <Button color="primary" onClick={gotohome} style={{ width: '45%' }}>Buy More</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            ) : (
                <Col className="d-flex justify-content-center align-items-center">
                    <Card className="mb-3" style={{ width: '400px', marginTop: '20px' }}>
                        <CardBody>
                            <CardTitle tag="h5" style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>Your Cart is Empty</CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            )}


        </Container>
    );
};

export default CART;
