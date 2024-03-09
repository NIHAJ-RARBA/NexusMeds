import React, {component, useEffect} from 'react';
import { useState } from 'react';
import EDITPROFILE from './editprofile';
import { Button, Container, Row, Col, Card, CardTitle, CardText, CardImg, CardBody } from 'reactstrap';

const DASHBOARD = ({setAuth}) => {

    
    const [customer_name, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date_of_birth, setdate_of_birth] = useState("");
    const [image, setImage] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [billing_address, setBillingAddress] = useState("");

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

    const logout = (e) => {
        e.preventDefault();

        console.log("Logging out" + user);
        try {
            fetch("http://localhost:5000/auth/logout", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    token: localStorage.token 
                },
                body: JSON.stringify({id : user.customer_id}) 
            });                

            localStorage.removeItem("token");
            setAuth(false);


            console.log("Logged out successfully");
            window.location.reload();
        
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (    
        <div className="DASHBOARD">
            <Container fluid>            <h3 className='mt-5'>Dashboard</h3>
            <h4 style={{paddingT: '10px'}}>Welcome, {customer_name} !</h4>
            <Row>
            {/* <div style={{  }}></div> */}
                    <Col xs="auto" md={3} className="p-4" style={{height:'300px',backgroundColor: 'lightgray', marginLeft: '20px',marginTop: '115px'}}>
                        {/* <h5>Menu</h5> */}
                        <ul className="list-unstyled">
                            <li><Button onClick={e => logout(e)} className="btn btn-primary mb-2">Logout</Button></li>
                            <li><Button className="btn btn-warning mb-2" onClick={() => { window.location.href = "/"; }}>See Home Page</Button></li>
                            <li><Button color="none" style={{ border: 'none' }}><EDITPROFILE user={user} /></Button></li>
                        </ul>
                    </Col>
                    <Col xs="auto" md={9} className="p-4" style={{width:'700px'}}>
            {/* Displaying the variable values */}

            
            
            {/* <div className="button-container">
                <Button onClick={e => logout(e)} className="btn btn-primary" style={{ marginRight: '10px' }}>Logout</Button>
                <Button className="btn btn-warning" onClick={() => {
                    window.location.href = "/";
                }}>See Home Page</Button>
                <Button color="none" style={{ border: 'none' }}><EDITPROFILE user={user}/></Button>
            </div> */}

            <Card className="mt-3">
                <CardTitle tag="h5"><b>Profile Information</b></CardTitle>
                <CardBody>
                    <CardText>Gender: {gender}</CardText>
                    <CardText>Email: {email}</CardText>
                    <CardText>Phone: {phone}</CardText>
                    <CardText>Date of Birth: {date_of_birth}</CardText>
                    <CardText>Profile Picture: </CardText>
                    {image? (
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
                </Col>

            </Row>
            </Container>

        </div>
    )
};

export default DASHBOARD;