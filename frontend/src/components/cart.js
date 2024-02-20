import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col, Input, Form } from 'reactstrap';

const CART = () => {
    // Sample cart items
    const [cartItems, setCartItems] = useState();

    // Function to handle quantity change
    const handleQuantityChange = (itemId, event) => {
        const newCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: parseInt(event.target.value) };
            }
            return item;
        });
        setCartItems(newCartItems);
    };

    // Function to remove item from cart
    const removeFromCart = (itemId) => {
        const newCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(newCartItems);
    };

    // Function to place order
    const placeOrder = () => {
        // Your logic for placing the order
        console.log("Order placed!");
    };

    return (
        <Container>
            <div style={{ marginTop: '115px' }}></div>
            <h1 className="text-center mt-5">Your Cart</h1>
            <Row>
                {cartItems.map(item => (
                    <Col key={item.id} md={4}>
                        <Card className="mb-3">
                            <CardImg top width="100%" src={item.image} alt={item.name} />
                            <CardBody>
                                <CardTitle tag="h5">{item.name}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Price: ${item.price}</CardSubtitle>
                                <CardText>
                                    <Form>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Button color="secondary" onClick={() => handleQuantityChange(item.id, { target: { value: item.quantity - 1 } })}>-</Button>
                                            <Input type="text" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e)} />
                                            <Button color="secondary" onClick={() => handleQuantityChange(item.id, { target: { value: item.quantity + 1 } })}>+</Button>
                                        </div>
                                    </Form>
                                </CardText>

                                <Button color="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="text-center">
                <Button color="success" onClick={placeOrder}>Place Order</Button>
            </div>
        </Container>
    );
}

export default CART;
