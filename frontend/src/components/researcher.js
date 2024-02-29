import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
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
        <div className="RESEARCHER">
            <div style={{ marginTop: '115px' }}></div>
            <h3 className='mt-5'>Researcher Dashboard</h3>
            <h4 style={{ paddingTop: '10px' }}>Welcome, {researcherName} !</h4>
            <div className="button-container">
                <Button onClick={e => logout(e)} color="primary" style={{ marginRight: '10px' }}>Logout</Button>
                <Button color="warning" onClick={() => { window.location.href = "/"; }}>See Home Page</Button>
                <Button style={{ border: 'none' }}><EDITPROFILE user={user} /></Button>
            </div>
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
        </div>
    );
};

export default RESEARCHER;
