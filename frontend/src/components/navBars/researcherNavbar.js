import React from 'react';
import GREETINGS_DROPDOWN from '../greetings_dropdown';
import RESEARCHER from '../dashboards/researcher';
import { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

let firstTime = true;

const RESEARCHERNAVBAR = ({isLoggedIn}) => {

    const [loggedIn, setLoggedIn] = useState(isLoggedIn);
    const [searchQuery, setSearchQuery] = useState('');
    const [resultList, setResults] = useState([]);
    const [searchChem, setSearchChem] = useState(false);

 
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

    
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setResults([]); // Clear search results if search query is empty
        }
        else {
            handleSearch(searchQuery);
        }
    }
    , [searchQuery]);



    const handleSearch = async (searchQuery) => {

        setSearchQuery(searchQuery);

        if (searchQuery.trim() === '') {
            setResults([]); // Clear search results if search query is empty
            return;
        }

        if (searchChem === true) {
            const res = await fetch(`http://localhost:5000/search/getAllChems`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ search: searchQuery })
            });
            const parseRes = await res.json();
            console.log(parseRes);
            setResults(parseRes);
        }
        else {
            const res = await fetch(`http://localhost:5000/search/getAllMeds`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ search: searchQuery })
            });
            const parseRes = await res.json();
            console.log(parseRes);
            setResults(parseRes);
        }

    };

    const handleChemSwitchChange = () => {
        setSearchChem(true);
    };

    const handleMedSwitchChange = () => {
        setSearchChem(false);
    };


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // store in local storage
        localStorage.setItem('searchResults', JSON.stringify(resultList));
        // window.location = `/searchResults-chem`;

        if (searchChem) {
            window.location = `/searchResults-chem`;
        }
        else {
            window.location = `/searchResults`;
        }
    };
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
                            <a className="nav-link" href="/all-chemicals">All Chemicals</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/viewmedicines">All Medicines</a>
                        </li>


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
                            
                            <li className="nav-item" style={{ marginLeft: 'auto' }}>
            <div className="form-check form-switch">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="flexSwitchCheckDefaultChem" 
                    checked={searchChem} 
                    onChange={handleChemSwitchChange} 
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefaultChem">Chemicals</label>
            </div>
            <div className="form-check form-switch">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="flexSwitchCheckDefaultMed" 
                    checked={!searchChem} 
                    onChange={handleMedSwitchChange} 
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefaultMed">Medicines</label>
            </div>
        </li>
                            {resultList.length > 0 && searchQuery.trim() !== '' && // Added condition to check if search query is not empty
                                <Dropdown isOpen={true} toggle={() => { }}>
                                    <DropdownToggle caret={false} className="nav-link">
                                        Search Results
                                    </DropdownToggle>
                                    <DropdownMenu className="scrollable-dropdown" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        {searchChem ? 
                                        resultList.map(chem => (
                                            <DropdownItem key={chem.chemical_id} href={`/specificchemical/${chem.chemical_id}`}>
                                                {chem.chem_name}
                                            </DropdownItem>
                                        ))
                                        :
                                        resultList.map(medicine => (
                                            <DropdownItem key={medicine.medicine_id} href={`/specificmedicine/${medicine.medicine_id}`}>
                                                {medicine.med_name} {medicine.dosagestrength}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            }
                        {/* </li> */}
                            

                    </ul>
                </div>
                        <ul className="navbar-nav ml-auto">
                            {loggedIn ? (
                                <li className="nav-item">
                                    <a className="" href="/researcher_cart">
                                        <img src="https://cdn-icons-png.freepik.com/256/1062/1062974.png?ga=GA1.1.46121468.1709196826&" alt="cart" style={{ width: '40px', height: '40px', marginRight: '20px' }} />
                                    </a>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <a className="" href="/signin">
                                        <img src="https://cdn-icons-png.freepik.com/256/1062/1062974.png?ga=GA1.1.46121468.1709196826&" alt="cart" style={{ width: '40px', height: '40px', marginRight: '20px' }} />
                                    </a>
                                </li>
                            )}
                        </ul>
                <GREETINGS_DROPDOWN loggedIn={true} customer_name={"Researcher"} logout={logout} />
            </div>
        </nav>
    );
}

export default RESEARCHERNAVBAR;
