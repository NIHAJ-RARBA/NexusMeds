import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardText, Button, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'reactstrap';
import PaginationBar from '../paginationBar';

const ApproveOrders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5); // Number of orders per page
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, [currentPage]); // Fetch orders whenever the currentPage changes

    useEffect(() => {
        if (selectedOrder) {
            navigate('/approveSpecificOrder', { state: { order: selectedOrder } });
        }
    }, [selectedOrder, navigate]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:5000/order/getAll?page=${currentPage}&limit=${ordersPerPage}`);
            const data = await response.json();
            setOrders(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    // Logic for pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container>
            <div style={{ marginTop: '115px' }}></div>
            <h1><u>Approve Orders</u></h1>
            {orders.length === 0 ? (
                <Alert color="info" className="text-center mt-3" style={{ height: '100px', fontSize: '40px' }}>No pending orders</Alert>
            ) : (
                orders.map((order) => (
                    <Card key={order.order_id} style={{ width: '100%', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleOrderClick(order)}>
                        <CardBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <CardText>Order ID: {order.order_id}</CardText>
                                <CardText>Price: {order.price}</CardText>
                            </div>
                            <div>
                            </div>
                            <Button color="primary">View Details</Button>
                        </CardBody>
                    </Card>
                ))
            )}
            {/* Pagination */}
            <PaginationBar currentPage={currentPage} totalPages={Math.ceil(orders.length / ordersPerPage)} paginate={paginate} />
        </Container>
    );
};

export default ApproveOrders;
