import React, { Component } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup
} from 'reactstrap';

// toast.configure();

const SIGNUP = ({ setAuth }) => {


    const [password, setPassword] = useState("");
    // const [confirmpassword, setConfirmPassword] = useState("");

    const [gender, setGender] = useState(null);

    const [customer_name, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");
    const [date_of_birth, setdate_of_birth] = useState("");
    const [image, setImage] = useState("");
    const [address, setAddress] = useState("");
    const [billing_address, setBillingAddress] = useState("");




    const onSave = async (e) => {

        e.preventDefault();
        try {

            if (!customer_name || !email || !password || !phone || !date_of_birth || !image || !address || (gender===null) || !billing_address.trim()) {
                throw new Error('All fields are required');
            }

            const body = { customer_name, email, password, phone, date_of_birth, image, address, gender, billing_address };
            console.log('Creating profile with data:', body);

            const response = await fetch(`http://localhost:5000/auth/register/customer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                console.log(parseRes.token);
                setAuth(true);
                toast.success("Registered Successfully");
            } else {
                console.log(parseRes);
                setAuth(false);

                if (parseRes.error === '12345') {
                    toast.error("Name is faulty");
                }
                else if( parseRes.error === '12346') {
                    
                    toast.error("Enter a valid Phone");
                }
                else {
                    toast.error(parseRes.error);
                }
            }


            console.log('Response from server:', response);

        } catch (error) {

            // console.error(error.message);
            // toast.error(error.message);

            //if all data including gender is not present then toast

            if (!customer_name) {
                toast.error("Name is required");
            }
            else if (!email) {
                toast.error("Email is required");
            }
            else if (!password) {
                toast.error("Password is required");
            }
            else if (!phone) {
                toast.error("Phone is required");
            }
            else if (!date_of_birth) {
                toast.error("Date of Birth is required");
            }
            else if (!image) {
                toast.error("Image is required");
            }
            else if (!address) {
                toast.error("Address is required");
            }
            else if (gender === null) {
                toast.error("Gender is required");
            }
            else if (!billing_address || billing_address.trim() === "") {
                toast.error("Billing Address is required");
                return;
            }
            else {
                toast.error(error.message);
            }
        }

    };

    return (
        <div>
            <div style={{ marginTop: '115px' }}></div>
            <div style={{ fontSize: '22px', paddingBottom: '30px', paddingTop: '20px' }}>
                <Link to="/signin"><b>Already have an account? Sign In</b></Link>
            </div>
            <div className="SIGNUP" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', margin: '0 auto' }}>
                <Form style={{ width: '70%', margin: '0 auto' }}>

                    <FormGroup>
                        <Label for="customer_name">Full Name</Label>
                        <Input
                            type="text"
                            name="customer_name"
                            id="customer_name"
                            placeholder="Enter your full name"
                            value={customer_name}
                            onChange={e => setFullName(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="text"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </FormGroup>

                    {/* // add a gap between them */}



                    <FormGroup style={{ paddingTop: '80px' }}>
                        <Label for="phone">Phone</Label>
                        <Input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Enter your phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="date_of_birth">Date of Birth</Label>
                        <Input
                            type="text"
                            name="date_of_birth"
                            id="date_of_birth"
                            placeholder="Enter your date of birth"
                            value={date_of_birth}
                            onChange={e => setdate_of_birth(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="image">Profile Picture</Label>
                        <Input
                            type="text"
                            name="image"
                            id="image"
                            placeholder="Enter your profile picture"
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Enter your address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="gender">Gender</Label>
                        <div>
                            <Label check>
                                <Input
                                    type="radio"
                                    name="gender"
                                    value={true}
                                    checked={gender === true}
                                    onChange={e => setGender(true)}
                                />{' '}
                                Male
                            </Label>
                        </div>
                        <div>
                            <Label check>
                                <Input
                                    type="radio"
                                    name="gender"
                                    value={false}
                                    checked={gender === false}
                                    onChange={e => setGender(false)}
                                />{' '}
                                Female
                            </Label>
                        </div>
                    </FormGroup>


                    <FormGroup>
                        <Label for="billing_address">Billing Address</Label>
                        <Input
                            type="text"
                            name="billing_address"
                            id="billing_address"
                            placeholder="Enter your billing_address"
                            value={billing_address}
                            onChange={e => setBillingAddress(e.target.value)}
                        />
                    </FormGroup>



                    <Button className="btn btn-success" onClick={onSave} style={{ fontSize: '18px', width: '100%' }}>Sign Up</Button>
                </Form>

            </div>
        </div>
    );
};

export default SIGNUP;