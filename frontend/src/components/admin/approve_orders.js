import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardText, Button, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const ApproveOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (selectedOrder) {
            navigate('/approveSpecificOrder', { state: { order: selectedOrder } });
        }
    }, [selectedOrder, navigate]);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/order/getAll');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    return (
        <Container>
            <h1>Approve Orders</h1>
            {orders.map((order) => (
                <Card key={order.order_id} style={{ width: '100%', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleOrderClick(order)}>
                    <CardBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <CardText>Order ID: {order.order_id}</CardText>
                            <CardText>Price: {order.price}</CardText>
                        </div>
                        <Button color="primary">View Details</Button>
                    </CardBody>
                </Card>
            ))}
        </Container>
    );
};

export default ApproveOrders;
