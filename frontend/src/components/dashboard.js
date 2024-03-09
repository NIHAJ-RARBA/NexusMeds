import React, { useEffect, useState } from 'react';
import EDITPROFILE from './editprofile';
import { Button, Container, Row, Col, Card, CardTitle, CardText, CardImg, CardBody, Table } from 'reactstrap';
import moment from 'moment';

const DASHBOARD = ({ setAuth }) => {
    const [customer_id, setCustomerId] = useState("");
    const [customer_name, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date_of_birth, setdate_of_birth] = useState("");
    const [image, setImage] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [billing_address, setBillingAddress] = useState("");

    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [showPendingOrders, setShowPendingOrders] = useState(false);

    const [orderHistoryData, setOrderHistoryData] = useState([]);

    const [pendingOrdersData, setPendingOrdersData] = useState([]);
    

    const getPendingOrders = async () => {
        try {
            const res = await fetch(`http://localhost:5000/customer/pendingOrders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({ id: customer_id })
            });

            const parseRes = await res.json();
            console.log(parseRes);

            const formattedOrders = parseRes.map(order => ({
                ...order,
                order_date: moment(order.order_date).format('YYYY-MM-DD'),
                shipment_date: moment(order.shipment_date).format('YYYY-MM-DD'),
            }));

            setPendingOrdersData(formattedOrders);
        } catch (error) {
            console.error(error.message);
        }
    };

    const getOrderHistory = async () => {
        try {
            const res = await fetch(`http://localhost:5000/customer/orderHistory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({ id: customer_id })
            });

            const parseRes = await res.json();
            console.log('orderhistory');
            console.log(parseRes);

            const formattedOrders = parseRes.map(order => ({
                ...order,
                order_date: moment(order.order_date).format('YYYY-MM-DD'),
                shipment_date: moment(order.shipment_date).format('YYYY-MM-DD'),
            }));

            setOrderHistoryData(formattedOrders);
        } catch (error) {
            console.error(error.message);
        }
    };

    const [user, setUser] = useState({});

    const getProfile = async () => {
        try {
            // check if admin
            try {
                const adminRes = await fetch(`http://localhost:5000/admin/`, {
                    method: "POST",
                    headers: { token: localStorage.token }
                });

                const adminParseRes = await adminRes.json();
                console.log(adminParseRes);

                if (adminParseRes.admin_id) {
                    window.location.href = "/admin";
                    return;
                }
            } catch (error) {
                console.error(error.message);
            }

            try {
                // check if researcher
                const researcherRes = await fetch(`http://localhost:5000/researcher/`, {
                    method: "POST",
                    headers: { token: localStorage.token }
                });

                const researcherParseRes = await researcherRes.json();
                console.log(researcherParseRes);

                if (researcherParseRes.researcher_id) {
                    window.location.href = "/researcher";
                    return;
                }

            } catch (error) {
                console.error(error.message);
            }

            const res = await fetch(`http://localhost:5000/customer/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            console.log(parseRes);

            setUser(parseRes);

            setCustomerId(parseRes.customer_id);
            setCustomerName(parseRes.customer_name);
            setEmail(parseRes.email);
            setPhone(parseRes.phone);
            setdate_of_birth(parseRes.date_of_birth);
            setImage(parseRes.image);
            setGender(parseRes.gender ? "Male" : "Female");
            setAddress(parseRes.address);
            setBillingAddress(parseRes.billing_address);

        } catch (error) {
            console.error(error.message);
        }
    };

    const logout = async (e) => {
        e.preventDefault();

        console.log("Logging out" + user);
        try {
            const response = await fetch("http://localhost:5000/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({ id: user.customer_id })
            });

            if (response.ok) {
                localStorage.removeItem("token");
                setAuth(false);
                console.log("Logged out successfully");
                window.location.reload();
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (customer_id !== "") {
            getPendingOrders();
            getOrderHistory();
        }
    }, [customer_id]);

    const toggleShowPendingOrders = () => {
        setShowPendingOrders(true);
        setShowOrderHistory(false);
    };

    const toggleShowOrderHistory = () => {
        
        setShowPendingOrders(false);
        setShowOrderHistory(true);
    };

    return (
        <div className="DASHBOARD">
            <Container fluid>
                <h3 className='mt-5'>Dashboard</h3>
                <h4 style={{ paddingTop: '10px' }}>Welcome, {customer_name}!</h4>
                <Row>
                    <Col xs="auto" md={3} className="p-4" style={{ height: '300px', backgroundColor: 'lightgray', marginLeft: '20px', marginTop: '115px' }}>
                        <ul className="list-unstyled">
                            <li><Button onClick={e => logout(e)} className="btn btn-primary mb-2">Logout</Button></li>
                            <li><Button className="btn btn-warning mb-2" onClick={() => { window.location.href = "/"; }}>See Home Page</Button></li>
                            <li><Button color="none" style={{ border: 'none' }}><EDITPROFILE user={user} /></Button></li>
                            <li><Button className="btn btn-success mb-2" onClick={toggleShowPendingOrders}>Pending Orders</Button></li>
                            <li><Button className="btn btn-success mb-2" onClick={toggleShowOrderHistory}>Order History</Button></li>
                        </ul>
                    </Col>
                    <Col xs="auto" md={9} className="p-4" style={{ width: '700px' }}>
                        {showPendingOrders && (
                            <div>
                                <h4>Pending Orders</h4>
                                <Table>
                                    <thead>
                                        <tr>

                                            <th>Order Date</th>
                                            <th>Price</th>
                                            <th>Shipment Date</th>
                                            <th>Billing Address</th>
                                            <th>Prescription</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingOrdersData.map((order) => (
                                            <tr key={order.order_id}>

                                                <td>{order.order_date}</td>
                                                <td>{order.price}</td>
                                                <td>{order.shipment_date}</td>
                                                <td>{order.billing_address}</td>
                                                <td>
                                                    {order.prescription ? (
                                                        <a href={order.prescription} target="_blank" rel="noreferrer">View Prescription</a>
                                                    ) : (
                                                        "Not Available"
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>

                        )}
                        {showOrderHistory && (
                            <div>
                            <h4>Order History</h4>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Order Date</th>
                                        <th>Shipment Date</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderHistoryData.map((order) => (
                                        <tr key={order.order_history_id}>
                                            <td>{order.order_date}</td>
                                            <td>{order.shipment_date}</td>
                                            <td>{order.price}</td>
                                            <td style={{ backgroundColor: order.status ? 'green' : 'rgba(255, 0, 0, 0.3)' }}>
                                                {order.status ? 'Delivered' : 'Refunded'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        

                        )}
                        {!showPendingOrders && !showOrderHistory && (
                            <Card className="mt-3">
                                <CardTitle tag="h5"><b>Profile Information</b></CardTitle>
                                <CardBody>
                                    <CardText>Gender: {gender}</CardText>
                                    <CardText>Email: {email}</CardText>
                                    <CardText>Phone: {phone}</CardText>
                                    <CardText>Date of Birth: {date_of_birth}</CardText>
                                    <CardText>Profile Picture: </CardText>
                                    {image ? (
                                        <a href={image} target="_blank" rel="noreferrer">
                                            <CardImg src={image} alt="Profile" style={{ maxWidth: '18%', height: 'auto' }} />
                                        </a>
                                    ) : (
                                        <CardImg src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="Profile" style={{ maxWidth: '18%', height: 'auto' }} />
                                    )}
                                    <CardText>Address: {address}</CardText>
                                    <CardText>Billing Address: {billing_address}</CardText>
                                </CardBody>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default DASHBOARD;
