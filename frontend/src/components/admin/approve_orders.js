import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardText, Button, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'reactstrap';
import moment from 'moment';

const ApproveOrders = () => {
    const [orders, setOrders] = useState([]);
    const [researcherOrders, setResearcherOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isCustomer, setIsCustomer] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, [isCustomer]);

    useEffect(() => {
        if (selectedOrder) {;
            navigate('/approveSpecificOrder', { state: { order: selectedOrder, isCustomer: isCustomer } });
        }
    }, [selectedOrder, navigate]);

    const fetchOrders = async () => {
        try {
            let customerOrders = [];
            let researcherOrders = [];

            const response = await fetch('http://localhost:5000/order/getAll');
            const data = await response.json();

            for (let i = 0; i < data.length; i++) {
                const isCustomerOrder = await checkOrderIfCustomer(data[i].order_id);
                
                if(isCustomerOrder){
                    customerOrders.push(data[i]);
                } else {
                    researcherOrders.push(data[i]);
                }
            }

            const formattedCustomerOrders = customerOrders.map(order => ({
                ...order,
                order_date: moment(order.order_date).format('YYYY-MM-DD'),
                shipment_date: moment(order.shipment_date).format('YYYY-MM-DD'),
            }));

            const formattedResearcherOrders = researcherOrders.map(order => ({
                ...order,
                order_date: moment(order.order_date).format('YYYY-MM-DD'),
                shipment_date: moment(order.shipment_date).format('YYYY-MM-DD'),
            }));

            if (isCustomer) {
                setOrders(formattedCustomerOrders);
            } else {
                setResearcherOrders(formattedResearcherOrders);
            }

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const checkOrderIfCustomer = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5000/order/checkOrderIfCustomerOrder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_id: orderId })
            });

            const data = await response.json();

            if(data.customer_order){
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error checking order:', error);
            return false;
        }
    };

    const handleOrderClick = (order, myCustomer) => {
        setSelectedOrder(order);
        setIsCustomer(myCustomer);
    };

    const handleCustomerSwitchChange = () => {
        setIsCustomer(true);
    };

    const handleResearcherSwitchChange = () => {
        setIsCustomer(false);
    };

    return (
        <Container>
            <div style={{ marginTop: '115px' }}></div>``
            <div className="row align-items-center">
                <div className="col-auto">
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckCustomer"
                            checked={isCustomer}
                            onChange={handleCustomerSwitchChange}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckCustomer" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Customer</label>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckResearcher"
                            checked={!isCustomer}
                            onChange={handleResearcherSwitchChange}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckResearcher" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Researcher</label>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '115px' }}></div>
            <h1><u>Approve Orders</u></h1>
            {isCustomer && orders.length === 0 ? (
                <Alert color="info" className="text-center mt-3" style={{ height: '100px', fontSize: '40px' }}>No pending orders</Alert>
            ):!isCustomer && researcherOrders.length === 0 ? (
                <Alert color="info" className="text-center mt-3" style={{ height: '100px', fontSize: '40px' }}>No pending orders</Alert>
            )  : isCustomer ? (
                orders.map((order) => (
                    <Card key={order.order_id} style={{ width: '100%', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleOrderClick(order, true)}>
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
            ) : (
                researcherOrders.map((order) => (
                    <Card key={order.order_id} style={{ width: '100%', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleOrderClick(order, false)}>
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
        </Container>
    );
};

export default ApproveOrders;