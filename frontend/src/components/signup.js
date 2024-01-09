import React, { Component } from 'react';
import { useState } from 'react';

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


const SIGNUP = () => {


    // const [password, setPassword] = useState("");
    // const [confirmpassword, setConfirmPassword] = useState("");

    const [gender, setGender] = useState("");

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");
    const [date_of_birth, setdate_of_birth] = useState("");
    const [profilepicture, setProfilepicture] = useState("");
    const [_address, setAddress] = useState("");


    const onSave = () => {
        addProfile();
    };

    const addProfile = async () => {
        try {
            const body = { fullname, email, phone, date_of_birth , profilepicture, _address, gender };
            console.log('Updating profile with data:', body);
    
            const response = await fetch(`http://localhost:5000/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
    
            console.log('Response from server:', response);
    
            window.location = "/viewusers";
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }

    };

    return (
        <div className="SIGNUP" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', margin: '0 auto' }}>
            <Form style={{ width: '70%', margin: '0 auto' }}>
                
                <FormGroup>
                    <Label for="fullname">Full Name</Label>
                    <Input
                        type="text"
                        name="fullname"
                        id="fullname"
                        placeholder="Enter your full name"
                        value={fullname}
                        onChange={e => setFullname(e.target.value)}
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
                    <Label for="profilepicture">Profile Picture</Label>
                    <Input
                        type="text"
                        name="profilepicture"
                        id="profilepicture"
                        placeholder="Enter your profile picture"
                        value={profilepicture}
                        onChange={e => setProfilepicture(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="_address">Address</Label>
                    <Input
                        type="text"
                        name="_address"
                        id="_address"
                        placeholder="Enter your address"
                        value={_address}
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

            </Form>
            
            <Button className="btn btn-warning" onClick={onSave} style={{ fontSize: '30px' }}>Add</Button>
        </div>
    );
};

export default SIGNUP;