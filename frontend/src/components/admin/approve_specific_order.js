import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, CardImg } from 'reactstrap';
import { useLocation } from 'react-router-dom';

const SpecificOrderPage = () => {
    const location = useLocation();
    const order = location.state.order;
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        if (order.prescription) {
            //order.prescription is blob(2 bytes) in the database

            // Convert the blob to a URL
            // const url = URL.createObjectURL(order.prescription);
            // setImageSrc(url);

        }
    }, [order.prescription]);

    const approveOrder = async () => {
        try {

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

        window.location.href = '/approve/orders'; // Redirect to admin orders page
        console.log('Order Approved:', order);
    };

    const handleReject = () => {
        rejectOrder();
        window.location.href = '/approve/orders';
        console.log('Order Rejected:', order);
    };

    return (
        <div>
            <h1>Order Details</h1>
            <Card style={{ marginBottom: '10px' }}>
                <CardBody>
                    <CardTitle>Order ID: {order.order_id}</CardTitle>
                    <CardText>Price: {order.price}</CardText>
                    <CardText>Billing Address: {order.billing_address}</CardText>
                    <CardText>Order Date: {order.order_date}</CardText>
                    {imageSrc && <CardImg src={imageSrc} alt="Prescription" style={{ width: '100%', height: 'auto' }} />}
                </CardBody>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button onClick={() => handleApprove()} style={{ marginRight: '10px' }}>Approve</Button>
                    <Button onClick={() => handleReject()}>Reject</Button> {/* Corrected onClick handler */}
                </div>
            </Card>
        </div>
    );
};

export default SpecificOrderPage;
