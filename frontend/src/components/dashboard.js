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
            console.log(parseRes);

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

    const logout = (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            console.log("Logged out successfully");
        
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
            <h3 className='mt-5'>Dashboard</h3>
            <h4 style={{paddingT: '10px'}}>Welcome, {customer_name} !</h4>
            <button onClick={e => logout(e)} className="btn btn-primary">Logout</button>

            <p>Gender: {gender}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Date of Birth: {date_of_birth}</p>
            <p>Profile Picture: </p>

            {/* Display the image */}
            {image && <a href={image} target="_blank" rel="noopener noreferrer"><img src={image} alt="Profile" style={{ maxWidth: '18%', height: 'auto' }} /></a>}

            <p>Address: {address}</p>
            <p>Billing Address: {billing_address}</p>
        </div>
    )
};

export default DASHBOARD;