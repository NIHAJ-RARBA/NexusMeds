import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col, Input, Form } from 'reactstrap';

const CART = () => {
    const [customer_id, setCustomerId] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [medItems, setMedItems] = useState([]);

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
            
            // console.log('Cart items:', jsonData);

            setCartItems(jsonData);

        } catch (error) {
            console.error(error.message);
        }
    };

    const getMedList = async () => {
        const arr = [];
        try {
            // get all the medicines in the cart list based on medicine id
            for (let i = 0; i < cartItems.length; i++) {
                const resp = await fetch(`http://localhost:5000/medicine/get/${cartItems[i].medicine_id}`);

                // console.log('Medicine id:', cartItems[i].medicine_id);
                const json = await resp.json();
                arr.push(json);
            }
            setMedItems(arr);
            // console.log('Medicine items:', arr);

        } catch (error) {
            console.error(error.message);
        }
    }

    const removeFromCart = (itemId) => {
        const newCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(newCartItems);
    };

    const placeOrder = () => {
        console.log("Order placed!");
    };

    

    const handleQuantityChange = (itemId, newQuantity) => {
        const newCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(newCartItems);
    };

    return (
        <Container>
            <div style={{ marginTop: '115px' }}></div>
            <h1 className="text-center mt-5">Your Cart</h1>
            <Row>
                {medItems.map(item => (
                    <Col key={item.id} md={4}>
                        <Card className="mb-3">
                            <CardImg top width="100%" src={item.image} alt={item.name} />
                            <CardBody>
                                <CardTitle tag="h5">{item.name}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Price: ${item.price}</CardSubtitle>
                                <CardText>
                                    <Form>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Button color="secondary" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</Button>
                                            <Input type="text" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} />
                                            <Button color="secondary" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                                        </div>
                                    </Form>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CART;
