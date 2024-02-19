import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const GREETINGS_DROPDOWN = ({ loggedIn, customer_name, logout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <ul className="navbar-nav ml-auto" >
            {loggedIn ? (
                <li className="nav-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <span className="nav-link">
                        <Dropdown isOpen={dropdownOpen || isHovered} toggle={toggleDropdown}>
                            <DropdownToggle className="custom-toggle" caret={false}>
                                Hello, {customer_name}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={logout}>Log out</DropdownItem>
                                <DropdownItem href="/dashboard">Dashboard</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                </li>
            ) : (
                <li className="nav-item">
                    <span className="nav-link">
                        <Button href='/signin'>Login</Button>
                    </span>
                    <span className="nav-link">
                        <p className="user-name" title="Register" style={{ margin: 0 }}>Register</p>
                    </span>
                </li>
            )}
        </ul>
    );
}

const NAVBAR = ({isLoggedIn, setAuth}) => {
    const loggedIn = isLoggedIn;



    
    const [customer_name, setCustomerName] = useState("");
    const [image, setImage] = useState("");
    const [showOptions, setShowOptions] = useState(false);


    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/customer/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            // console.log(parseRes);

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


    const handleSearch = (searchQuery) => {
        console.log(searchQuery);
        // Your logic for search
    }



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
                        {/* <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li> */}
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                style={{ width: '600px', backgroundColor: '#f0fff0' }} // Adjust width and background color
                                onChange={(e) => handleSearch(e.target.value)} // Call the search function onChange
                            />
                        </form>

                    </ul>

                    <ul className="navbar-nav ml-auto">
                        
                        {loggedIn ? (
                            <li className="nav-item">
                                <a className="" href="/cart">
                                <img src="https://cdn-icons-png.freepik.com/256/891/891407.png" alt="cart" style={{ width: '40px', height: '40px', marginRight: '20px' }} />
                                </a>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <a className="" href="/signin">
                                <img src="https://cdn-icons-png.freepik.com/256/891/891407.png"  alt="cart" style={{width: '40px', height: '40px', marginRight: '20px' }} />
                                </a>
                            </li>
                        )}
                    </ul>


                    <ul className="navbar-nav ml-auto">
                        <GREETINGS_DROPDOWN loggedIn={loggedIn} customer_name={customer_name} logout={logout}/>
                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default NAVBAR;