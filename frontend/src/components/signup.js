import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    const location = useLocation();

    const [userChoice, setUserChoice] = useState(null);


    const [password, setPassword] = useState("");
    // const [confirmpassword, setConfirmPassword] = useState("");

    const [gender, setGender] = useState(null);

    const [customer_name, setFullName] = useState("");

    const [researcher_name, setResearcherName] = useState("");
    const [permit, setPermit] = useState(null);

    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");
    const [date_of_birth, setdate_of_birth] = useState("");
    const [image, setImage] = useState("");
    const [address, setAddress] = useState("");
    const [billing_address, setBillingAddress] = useState("");

    const handlePermitUpload = async (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        
        // Create FormData object and append the file with the correct key
        const formData = new FormData();
        formData.append('permit', file);
    
        try {
            const res = await fetch('http://localhost:5000/permitUpload', {
                method: 'POST',
                body: formData
            });
    
            const data = await res.json();
            setPermit(data.downloadURL);
            console.log(data);
            console.log(data.downloadURL);
        } catch (error) {
            console.error(error.message);
        }
    };
    
    const researcherSave = async (e) => {
        e.preventDefault();
        try {
            
            if (!researcher_name || !email || !password || !phone || !date_of_birth || !permit ||  !address || (gender === null) || !billing_address.trim()) {
                throw new Error('Some fields are required');
            }

            const body = { researcher_name, email, password, phone, date_of_birth, image, address, gender, billing_address, permit };
            console.log('Creating profile with data:', body);

            const response = await fetch(`http://localhost:5000/auth/register/researcher`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
                // localStorage.setItem("token", parseRes.token);
                // console.log(parseRes.token);
                setAuth(false);
                toast.success("Your application is now awaiting approval. Meanwhile, take a look around!");
                window.location.reload();
            } else {
                console.log(parseRes);
                setAuth(false);

                if (parseRes.error === '12345') {
                    toast.error("Name is faulty");
                }
                else if (parseRes.error === '12346') {

                    toast.error("Enter a valid Phone");
                }
                else {
                    toast.error(parseRes.error);
                }
            }


            console.log('Response from server:', response);



        } catch (error) {
                        //if all data including gender is not present then toast

                        if (!researcher_name) {
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
                        else if (!permit) {
                            toast.error("Permit is required");
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


    useEffect(() => {
        setUserChoice(null);
        setAuth(false);
    }, [location.pathname]);

    useEffect(() => {
        const handlePopstate = () => {
            setUserChoice(null);
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);



    const onSave = async (e) => {

        e.preventDefault();
        try {

            if (!customer_name || !email || !password || !phone || !date_of_birth ||  !address || (gender === null) || !billing_address.trim()) {
                throw new Error('Some fields are required');
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
                else if (parseRes.error === '12346') {

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
            // else if (!image) {
            //     toast.error("Image is required");
            // }
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

            {userChoice === null && (
                <div style={{ margin: 0, padding: 0, height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        <Button style={{ fontSize: '24px', padding: '15px', marginBottom: '80px' }} onClick={() => setUserChoice(true)}>Customer Sign Up</Button>
                        <Button style={{ fontSize: '24px', padding: '15px' }} onClick={() => setUserChoice(false)}>Researcher Sign Up</Button>
                    </div>
                </div>

            )}

            {userChoice === true && (
                <div>
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
                                    type="password"
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
                            type="date"
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
            )}

            {userChoice === false && (
                <div style={{ marginTop: '115px' }}>
            <div style={{ fontSize: '22px', paddingBottom: '30px', paddingTop: '20px' }}>
                <Link to="/signin"><b>Already have an account? Sign In</b></Link>
            </div>
            <div className="SIGNUP" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', margin: '0 auto' }}>
                <Form style={{ width: '70%', margin: '0 auto' }}>

                    <FormGroup>
                        <Label for="researcher_name">Full Name</Label>
                        <Input
                            type="text"
                            name="customer_name"
                            id="customer_name"
                            placeholder="Enter your full name"
                            value={researcher_name}
                            onChange={e => setResearcherName(e.target.value)}
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
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
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
                            type="date"
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

                    <FormGroup>
                        <Label for="permit">Permit</Label>
                        <Input
                            type="file"
                            name="permit"
                            id="permit"
                            onChange={handlePermitUpload}
                        />
                    </FormGroup>

                    <Button className="btn btn-success" onClick={researcherSave} style={{ fontSize: '18px', width: '100%' }}>Sign Up</Button>
                </Form>
            </div>
        </div>
            )}

        </div>
    );
};

export default SIGNUP;