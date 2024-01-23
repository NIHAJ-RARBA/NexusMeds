import React, {component, useEffect} from 'react';
import { useState } from 'react';

const DASHBOARD = ({setAuth}) => {

    
    const [customer_name, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date_of_birth, setdate_of_birth] = useState("");
    const [image, setImage] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [billing_address, setBillingAddress] = useState("");


    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/customer/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();

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
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="DASHBOARD">
      {/* Displaying the variable values */}
      <p>Gender: {gender}</p>
      <p>Full Name: {customer_name}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Date of Birth: {date_of_birth}</p>
      <p>Profile Picture: {image} </p>
      
      {/* Display the image */}
      {image && <img src={image} alt="Profile" style={{ maxWidth: '100%' }} />}

      <p>Address: {address}</p>
      <p>Billing Address: {billing_address}</p>
        </div>
    )
};

export default DASHBOARD;