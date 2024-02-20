import React, { useEffect } from "react";
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



const EDITPROFILE = ({ user }) => {

    const [person_id, setPerson_id] = useState(user ? user.person_id || "" : "");
    const [gender, setGender] = useState(user ? user.gender || false : false);

    const [fullname, setFullname] = useState(user ? user.fullname || "" : "");
    const [email, setEmail] = useState(user ? user.email || "" : "");

    const [phone, setPhone] = useState(user ? user.phone || "" : "");
    const [date_of_birth, setdate_of_birth] = useState(user ? user.date_of_birth || "" : "");
    const [profilepicture, setProfilepicture] = useState(user ? user.profilepicture || "" : "");
    const [_address, setAddress] = useState(user ? user._address || "" : "");

    



    // set the state of the modal
    const [modal, setModal] = useState(false);
    

    const toggle = () => setModal(!modal);

    const onSave = () => {
        updateProfile();
        toggle();
    };

    const updateProfile = async () => {
        try {
            // Convert empty strings to null for boolean fields
            const body = {
                person_id,
                fullname,
                email,
                phone,
                gender,
                date_of_birth,
                profilepicture,
                _address,
            };
            
            const response = await fetch(`http://localhost:5000/users/${user.person_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            
            console.log('Updating profile with data:', body);
            console.log('Response from server:', response);
    
            window.location = "/viewusers";
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };
    
    


    return (
        <div className="EDITPROFILE">
<div style={{ marginTop: '115px' }}></div>

            <Button  className="btn btn-warning" onClick={toggle} data-target={`#id${user.person_id}`}>Edit Profile</Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="fullname">Full Name</Label>
                            <Input type="text" name="fullname" id="fullname" placeholder={fullname} value={fullname} onChange={e => setFullname(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder={email} value={email} onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input type="text" name="phone" id="phone" placeholder={phone} value={phone} onChange={e => setPhone(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="date_of_birth">Date of Birth</Label>
                            <Input type="text" name="date_of_birth" id="date_of_birth" placeholder={date_of_birth} value={date_of_birth} onChange={e => setdate_of_birth(e.target.value)} />
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="profilepicture">Profile Picture</Label>
                            <Input type="text" name="profilepicture" id="profilepicture" placeholder="Profile Picture" value={profilepicture} onChange={e => setProfilepicture(e.target.value)} />
                        </FormGroup> */}
                        <FormGroup>
                            <Label for="_address">Address</Label>
                            <Input type="text" name="_address" id="_address" placeholder={_address} value={_address} onChange={e => setAddress(e.target.value)} />
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
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={e => onSave(e)}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            

            </Modal>

            
            
        </div>
    );
};

export default EDITPROFILE;