import React, { useState } from 'react';
import GREETINGS_DROPDOWN from './greetings_dropdown';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

let firstTime = true;

const AdminNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const logout = (e) => {
        try {
            localStorage.removeItem("token");
            console.log("Logged out successfully");
            window.location.href = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    const reload = () => {
        if (localStorage.getItem("token") == null) {
            localStorage.clear();
            console.log('Cleared local storage');
        }
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
                            <a className="nav-link" href="/all-researchers">Verified Researchers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/all-customers">All Customers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/all-products">All Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/statistics">Statistics</a>
                        </li>
                        
                        <li className="nav-item">
                            <Dropdown isOpen={dropdownOpen || isHovered} toggle={toggleDropdown} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <DropdownToggle className="nav-link custom-toggle" caret={false}>
                                    Approve  &#11206;
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="/approve/orders">Orders</DropdownItem>
                                    <DropdownItem href="/approve/researchers">Researchers</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
                <GREETINGS_DROPDOWN loggedIn={true} customer_name={"Admin"} logout={logout} />
            </div>
            {/* Add the style here */}
            <style>
                {`
                    .custom-toggle {
                        color: darker; /* Text color */
                        font-weight: 400; /* Text weight */
                        padding: 0.5rem 1rem; /* Padding similar to other nav items */
                    }

                    .custom-toggle:hover,
                    .custom-toggle:focus {
                        background-color: #f8f9fa; /* Very light grey background color */
                        color: #000; /* Hover text color */
                    }
                `}
            </style>
        </nav>
    );
}

export default AdminNavbar;
