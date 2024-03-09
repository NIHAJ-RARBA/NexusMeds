import React, { useState, useEffect } from "react";
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EDITPROFILE = ({ user }) => {
    
    const [fullname, setFullname] = useState(user ? user.customer_name || "" : "");
    const [email, setEmail] = useState(user ? user.email || "" : "");
    const [phone, setPhone] = useState(user ? user.phone || "" : "");
    const [date_of_birth, setdate_of_birth] = useState(user ? user.date_of_birth || "" : "");
    const [image, setImage] = useState(user ? user.image || "" : "");
    const [gender, setGender] = useState(user ? user.gender || false : false);
    const [address, setAddress] = useState(user ? user.address || "" : "");
    const [billing_address, setBillingAddress] = useState(user ? user.billing_address || "" : "");

    const [modal, setModal] = useState(false);

    const toggle = () => {
        // if toggling to close, refresh page
        if (modal) {
            window.location.reload();
        }
        setModal(!modal);

        
    }

    useEffect(() => {
        console.log('user:', user);
        if (user) {
            setFullname(user.customer_name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
            setdate_of_birth(user.date_of_birth || "");
            setGender(user.gender || false);
            setAddress(user.address || "");
        }
    }, [user]);

    const onSave = async () => {
        try {
            const customer_name = fullname;
            const body = {
                customer_name,
                email,
                phone,
                date_of_birth,
                gender,
                address,
                billing_address,
                image
            };
    
            const response = await fetch(`http://localhost:5000/customer/update/${email}`, {
                method: "PUT",
                headers: {
                    token: localStorage.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
    
            const parseRes = await response.json();
            if (response.ok) {
                toast.success("Profile updated successfully");
            } else {
                toast.error(parseRes.message || "Failed to update profile");
            }
            toggle();
        } catch (error) {
            console.error('Error updating profile:', error.message);
            toast.error(error.message || "Failed to update profile");
        }
    };
    

    return (
        <div className="EDITPROFILE">
            <Button className="btn btn-warning" onClick={toggle}>Edit Profile</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="fullname">Full Name</Label>
                            <Input type="text" name="fullname" id="fullname" value={fullname} onChange={e => setFullname(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input type="text" name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="date_of_birth">Date of Birth</Label>
                            <Input type="text" name="date_of_birth" id="date_of_birth" value={date_of_birth} onChange={e => setdate_of_birth(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Image</Label>
                            <Input type="text" name="image" id="image" value={image} onChange={e => setImage(e.target.value)} />
                        </FormGroup>



                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" name="address" id="address" value={address} onChange={e => setAddress(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="billing_address">Billing Address</Label>
                            <Input type="text" name="billing_address" id="billing_address" value={billing_address} onChange={e => setBillingAddress(e.target.value)} />
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <legend>Gender</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="gender" checked={gender} onChange={() => setGender(true)} />{' '}
                                    Male
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="gender" checked={!gender} onChange={() => setGender(false)} />{' '}
                                    Female
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onSave}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default EDITPROFILE;
