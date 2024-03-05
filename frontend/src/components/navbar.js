import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AdminNavbar from './adminNavbar';
import RESEARCHERNAVBAR from './researcherNavbar';


const GREETINGS_DROPDOWN = ({ loggedIn, customer_name, logout}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // if nobody is actually logged in, then it should show login, register


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

const NAVBAR = ({isLoggedIn, setAuth,  searchResult}) => {
    const loggedIn = isLoggedIn;

    const [isAdmin, setIsAdmin] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);
    const [isResearcher, setIsResearcher] = useState(false);

    
    const [customer_name, setCustomerName] = useState("");
    const [image, setImage] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [resultList, setResultList] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const getAdmin = async () => {
        try {
            const res = await fetch(`http://localhost:5000/admin/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });
    
            const parseRes = await res.json();
            console.log(parseRes);
    
            setIsAdmin(parseRes.admin_id !== null);
        } catch (error) {
            console.error(error.message);
        }
    }
    
    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/customer/`, {
                method: "POST",
                headers: { token: localStorage.token }
            });
    
            const parseRes = await res.json();
            console.log(parseRes);
    
            setIsCustomer(parseRes.customer_id !== null);
            setCustomerName(parseRes.customer_name);
            setImage(parseRes.image);
        } catch (error) {
            console.error(error.message);
        }
    }
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // // Check if the user is an admin
                const adminRes = await fetch(`http://localhost:5000/admin/`, {
                    method: "POST",
                    headers: { token: localStorage.token }
                });
                const adminData = await adminRes.json();
                const isAdminUser = adminData !== 'No admin found' && adminData.admin_id !== null;
    
                if (isAdminUser) {
                    setIsAdmin(true);
                    return; // Exit early if the user is an admin
                }
    
                // If the user is not an admin, check if they are a customer
                const customerRes = await fetch(`http://localhost:5000/customer/`, {
                    method: "POST",
                    headers: { token: localStorage.token }
                });
                const customerData = await customerRes.json();
                const isCustomerUser = customerData !== 'No user found' && customerData.customer_id !== null;
                // console.log(customerData);
    
                if (isCustomerUser) {
                    setIsCustomer(true);
                    setCustomerName(customerData.customer_name);
                    setImage(customerData.image);
                    return; // Exit early if the user is a customer
                }
    
                // If the user is not a customer, they might be a researcher
                const researcherRes = await fetch(`http://localhost:5000/researcher/`, {
                    method: "POST",
                    headers: { token: localStorage.token }
                });
                const researcherData = await researcherRes.json();
                const isResearcherUser = researcherData.researcher_id !== null;
                console.log(researcherData);
                if (isResearcherUser) {
                    setIsResearcher(true);
                    setIsAdmin(false);
                    setIsCustomer(false);
                    setCustomerName(researcherData.researcher_name);
                    setImage(researcherData.image);
                }
            } catch (error) {
                console.error(error.message);
            }
        };
    
        fetchUserData();
    }, []);
    
    

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
        if (searchQuery.trim() === '') {
            setResultList([]); // Clear search results if search query is empty
        }
        else {
            handleSearch(searchQuery);
        }
    }
    , [searchQuery]);


    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleSearch = async (searchQuery) => {
        setSearchQuery(searchQuery);

        if (searchQuery.trim() === '') {
            setResultList([]); // Clear search results if search query is empty
            return;
        }

        // Your logic for search
        const res = await fetch(`http://localhost:5000/search/getAllMeds`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ search: searchQuery })
        });

        const parseRes = await res.json();
        console.log(parseRes);
        setResultList(parseRes);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // store in local storage
        localStorage.setItem('searchResults', JSON.stringify(resultList));
        window.location = `/searchResults`;
    };


        return (
            <div>
            {((isCustomer || (!isAdmin && !isResearcher)) || localStorage.getItem("token") === null || isLoggedIn == false) ?
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
                            <form className="d-flex" role="search" onSubmit={(e) => handleSearchSubmit(e)}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    style={{ width: '400px', backgroundColor: '#f0fff0' }}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </form>
                            {resultList.length > 0 && searchQuery.trim() !== '' && // Added condition to check if search query is not empty
                                <Dropdown isOpen={true} toggle={() => { }}>
                                    <DropdownToggle caret={false} className="nav-link">
                                        Search Results
                                    </DropdownToggle>
                                    <DropdownMenu className="scrollable-dropdown" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        {resultList.map(medicine => (
                                            <DropdownItem key={medicine.medicine_id} href={`/specificmedicine/${medicine.medicine_id}`}>
                                                {medicine.med_name} {medicine.dosagestrength}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            }
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
                                        <img src="https://cdn-icons-png.freepik.com/256/891/891407.png" alt="cart" style={{ width: '40px', height: '40px', marginRight: '20px' }} />
                                    </a>
                                </li>
                            )}
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <GREETINGS_DROPDOWN loggedIn={loggedIn} customer_name={customer_name} logout={logout} />
                        </ul>
                    </div>
                </div>
            </nav>
            :
            ((isResearcher && !isCustomer && !isAdmin)) ?
                <RESEARCHERNAVBAR isLoggedIn={loggedIn}/>
                :
                (isAdmin && (!isCustomer && !isResearcher)) ?
                    <AdminNavbar />
                :
                    null
        }
            </div>
        );

};

export default NAVBAR;