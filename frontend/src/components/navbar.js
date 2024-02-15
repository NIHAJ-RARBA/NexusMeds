import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import { useState } from 'react';


const NAVBAR = ({isLoggedIn, setAuth}) => {
    const loggedIn = isLoggedIn;



    
    const [customer_name, setCustomerName] = useState("");
    const [image, setImage] = useState("");


    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/customer/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            console.log(parseRes);

            setCustomerName(parseRes.customer_name);
            
            setImage(parseRes.image);
            
            
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
        <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/" style={{ fontSize: '30px', fontFamily: 'Roboto Mono' }}><b>NEXUSMEDS</b></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/viewotc">OTC MEDS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/prescriptionmeds" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                PRESCRIPTION MEDS
                            </a>

                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <ul className="navbar-nav ml-auto">

                    {loggedIn ? (
                        <span class="label">
                            <p className="user-name" title="username"><b>Hello,<br/> {customer_name}</b></p>
                        </span>
                    ) : (
                        <span class="label">
                            <Button href='/signin'>Login</Button>
                            <p class="user-name" title="Register">Register</p>
                        </span>
                    )}

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NAVBAR;