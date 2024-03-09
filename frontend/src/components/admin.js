import React, {component, useEffect} from 'react';
import { useState } from 'react';
import pfp from './images/Windows-10-user-icon-big.png';

const ADMIN = ({setAuth}) => {

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");


    const getProfile = async () => {
        try {

            // check if admin
            const adminRes = await fetch(`http://localhost:5000/admin/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });
            
            const adminParseRes = await adminRes.json();
            console.log(adminParseRes);
            
            if (adminParseRes.email == "amit@gmail.com") 
            {
                setName("Amit");
            }
            else if (adminParseRes.email == "abrar@gmail.com") 
            {
                setName("Abrar");
            }
            else 
            {
                setName("Admin");
            }

            setEmail(adminParseRes.email);
            setImage(pfp);


        } catch (error) {
            console.error(error.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            // setAuth(false);


            console.log("Logged out successfully");
            window.location.href = "/signin";
        
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="ADMIN" style={{height:'100vh'}}>
            <div style={{ marginTop: '115px' }}></div>
            {/* Displaying the variable values */}
            <h3 className='mt-5'>Admin Dashboard</h3>
            <h4 style={{paddingT: '10px'}}>Welcome, {name} !</h4>

            
            <div className="button-container">
                <button onClick={e => logout(e)} className="btn btn-primary" style={{ marginRight: '10px' }}>Logout</button>
                <button className="btn btn-warning" onClick={() => {
                    window.location.href = "/";
                }}>See Home Page</button>
            </div>

            <p>Email: {email}</p>

            {/* Display the image */}
            {image && <a href={image} target="_blank" rel="noopener noreferrer"><img src={image} alt="Profile" style={{ maxWidth: '18%', height: 'auto' }} /></a>}




        </div>
    )
};

export default ADMIN;