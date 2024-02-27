import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const GREETINGS_DROPDOWN = ({ loggedIn, customer_name, logout}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const gotoSignup = () => {
        window.location = '/signup';
    };

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
                        <Button href='/signin' >Login</Button>
                    </span>
                    <span className="nav-link">
                        <p className="user-name" title="Register" style={{ margin: 0 }} onClick={gotoSignup}><b>Register</b></p>
                    </span>
                </li>
            )}
        </ul>
    );
}

export default GREETINGS_DROPDOWN;