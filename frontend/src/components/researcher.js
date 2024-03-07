import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Container, Row, Col } from 'reactstrap';
import EDITPROFILE from './editprofile';
import pfp from './images/Windows-10-user-icon-big.png';

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

    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/researcher/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            console.log(parseRes);

            setUser(parseRes);

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
                body: JSON.stringify({id : user.researcher_id}) // Add an empty object as the body
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

    return (
        <div className="RESEARCHER">
            {/* <div style={{ marginTop: '115px' }}></div> */}

            <Container fluid>            <h3 className='mt-5'>Researcher Dashboard</h3>
            <h4 style={{ paddingTop: '10px' }}>Welcome, {researcherName} !</h4>


                <Row>
                <Col xs="auto" md={3} className="p-4" style={{height:'300px',backgroundColor: 'lightgray', marginLeft: '20px',marginTop: '115px'}}>
                        {/* <h5>Menu</h5> */}
                        <ul className="list-unstyled">
                            <li><Button onClick={e => logout(e)} className="btn btn-primary mb-2">Logout</Button></li>
                            <li><Button className="btn btn-warning mb-2" onClick={() => { window.location.href = "/"; }}>See Home Page</Button></li>
                            <li><Button color="none" style={{ border: 'none' }}><EDITPROFILE user={user} /></Button></li>
                        </ul>
                    </Col>
                    <Col xs="auto" md={9} className="p-4" style={{width:'700px'}}>
                        

            {/* <div className="button-container">
                <Button onClick={e => logout(e)} style={{ marginRight: '10px' }}>Logout</Button>
                <Button color="warning" onClick={() => { window.location.href = "/"; }}>See Home Page</Button>
                <Button color="none" style={{ border: 'none' }}><EDITPROFILE user={user} /></Button>
            </div> */}

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
            </Col>

                </Row>
                        </Container>
        </div>
    );
};

export default RESEARCHER;
