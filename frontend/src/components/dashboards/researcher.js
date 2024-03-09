import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Container, Row, Col } from 'reactstrap';
import EDITPROFILE from './editprofile';
import pfp from '../images/Windows-10-user-icon-big.png';
import { Table } from 'reactstrap';
const moment = require('moment');


const RESEARCHER = ({ setAuth }) => {
    const [researcherName, setResearcherName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [image, setImage] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [user, setUser] = useState({});

    const [showPendingOrders, setShowPendingOrders] = useState(false);
    const [showOrderHistory, setShowOrderHistory] = useState(false);

    const [pendingOrdersData, setPendingOrdersData] = useState([]);
    const [orderHistoryData, setOrderHistoryData] = useState([]);

    const [researcher_id, setResearcherId] = useState("");

    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/researcher/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            console.log(parseRes);

            setUser(parseRes);

            setResearcherId(parseRes.researcher_id);
            setResearcherName(parseRes.researcher_name);
            setEmail(parseRes.email);
            setPhone(parseRes.phone);
            setDateOfBirth(parseRes.date_of_birth);
            setImage(parseRes.image);
            setGender(parseRes.gender ? "Male" : "Female");
            setAddress(parseRes.address);
            setBillingAddress(parseRes.billing_address);
        } catch (error) {
            console.error(error.message);
        }
    };

    const logout = (e) => {
        e.preventDefault();
        try {
            console.log("Logging out" + user);

            fetch("http://localhost:5000/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({ id: user.researcher_id }) // Add an empty object as the body
            });
            localStorage.removeItem("token");
            setAuth(false);
            console.log("Logged out successfully");
            window.location.href = "/signin";
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (researcher_id !== "") {
            getPendingOrders();
            getOrderHistory();
        }
    }, [researcher_id]);

    const getPendingOrders = async () => {
        try {
            const res = await fetch(`http://localhost:5000/researcher/pendingOrders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({ id: researcher_id })
            });
    
            const parseRes = await res.json();
            console.log(parseRes);
    
            // Format the order_date using moment
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
            const res = await fetch(`http://localhost:5000/researcher/orderHistory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify({ id: researcher_id })
            });

            const parseRes = await res.json();
            console.log('orderhistory');
            console.log(parseRes);

            // Format the order_date and shipment_date using moment
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

    const toggleShowPendingOrders = () => {
        setShowPendingOrders(true);
        setShowOrderHistory(false);
    };

    const toggleShowOrderHistory = () => {
        
        setShowPendingOrders(false);
        setShowOrderHistory(true);
    };

    return (
        <div className="RESEARCHER">
            {/* <div style={{ marginTop: '115px' }}></div> */}

            <Container fluid>            <h3 className='mt-5'>Researcher Dashboard</h3>
                <h4 style={{ paddingTop: '10px' }}>Welcome, {researcherName} !</h4>


                <Row>
                    <Col xs="auto" md={3} className="p-4" style={{ height: '300px', backgroundColor: 'lightgray', marginLeft: '20px', marginTop: '115px' }}>
                        {/* <h5>Menu</h5> */}
                        <ul className="list-unstyled">
                            <li><Button onClick={e => logout(e)} className="btn btn-primary mb-2">Logout</Button></li>
                            <li><Button className="btn btn-warning mb-2" onClick={() => { window.location.href = "/"; }}>See Home Page</Button></li>
                            <li><Button color="none" style={{ border: 'none' }}><EDITPROFILE user={user} /></Button></li>
                            <li><Button className="btn btn-warning mb-2" onClick={toggleShowPendingOrders}>Pending Orders</Button></li>
                            <li><Button className="btn btn-warning mb-2" onClick={toggleShowOrderHistory}>Order History</Button></li>
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
                                <CardBody>
                                    <CardTitle tag="h5">Profile Information</CardTitle>
                                    <CardText>Gender: {gender}</CardText>
                                    <CardText>Email: {email}</CardText>
                                    <CardText>Phone: {phone}</CardText>
                                    <CardText>Date of Birth: {dateOfBirth}</CardText>
                                    <CardText>Profile Picture: </CardText>
                                    {image ? (
                                        <a href={image} target="_blank" rel="noopener noreferrer">
                                            <CardImg src={image} alt="Profile" style={{ maxWidth: '18%', height: 'auto' }} />
                                        </a>
                                    ) : (
                                        <CardImg src={pfp} alt="Profile" style={{ maxWidth: '18%', height: 'auto' }} />
                                    )}
                                    <CardText>Address: {address}</CardText>
                                    <CardText>Billing Address: {billingAddress}</CardText>
                                </CardBody>
                            </Card>
                        )}
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default RESEARCHER;
