import React from 'react';
import { Routes, link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HOMEPAGE from './components/homepage';
import SIGNIN from './components/signin';
import SIGNUP from './components/signup';
import EDITPROFILE from './components/editprofile';
import VIEWUSERS from './components/adminpages/viewusers';
import DASHBOARD from './components/dashboard';
import NAVBAR from './components/navbar';
import MEDSPECIFIC from './components/medicine/specificMedicine';
import VIEWOTC from './components/medicine/viewOTC';
import INDICATIONS from './components/medicine/otcIndications';
import CART from './components/cart';
import PLACE_ORDER from './components/place_order';
import ADMIN from './components/admin';
import ADMIN_APPROVE_ORDERS from './components/admin/approve_orders';
import ADMIN_APPROVE_SPECIFIC_ORDER from './components/admin/approve_specific_order';



import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VIEWPRESCRIPTIONMEDS from './components/medicine/viewPrescriptionMeds';
import SorryPage from './components/sorry';
import SEARCHRESULTS from './components/medicine/medSearchResults';
import CHEMRESULTSEARCH from './components/chemical/chemSearchResults';
import RESEARCHER from './components/researcher';
import VIEWMEDICINES from './components/medicine/viewmedicines';
import VIEWCHEMICALS from './components/chemical/viewchemical';
import VIEWRESEARCHERS from './components/adminpages/allResearchers';
import ADMIN_APPROVE_RESEARCHERS from './components/admin/approve_researchers';
import ADMIN_SPECIFICCHEM from './components/admin/admin_specificChem';
import ADMIN_MEDSPECIFIC from './components/admin/admin_specificMed';
import ADD_MEDICINE from './components/adminpages/addMedicine';
import ADD_CHEMICAL from './components/adminpages/addChemical';

import ALLPRODUCTS from './components/adminpages/allProducts';

import SPECIFIC_CHEMICAL from './components/chemical/specific_chemical';
import RESEARCHER_CART from './components/researcher/researcher_cart';
import RESEARCHER_PLACE_ORDER from './components/researcher/researcher_place_order';  
import RESEARCHER_ORDER_CONFIRMATION from './components/researcher/researcher_order_confirmation';

import INVENTORY from './components/adminpages/inventory';

import STATISTICS from './components/adminpages/statistics';



const Footer = () => {
  const handleClick = (path) => {
      window.location = path;
  };

  return (
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0', textAlign: 'center' }}>
          <div className="container">
              <div className="row">
                  <div className="col-md-6">
                      <h5><b>Quick Links</b></h5>
                      <ul className="list-unstyled">
                          <li onClick={() => handleClick('/')}>Home<br/></li>
                          <li onClick={() => handleClick('/viewmedicines')}>Medicines<br/></li>
                          {/* <li onClick={() => handleClick('/all-chemicals')}>Chemicals</li> */}
                          {/* <li onClick={() => handleClick('/viewotc')}>OTC Medicines</li> */}
                          <li onClick={() => handleClick('/viewusers')}>Users<br/></li>
                          <li onClick={() => handleClick('/dashboard')}>Dashboard<br/></li>
                          <li onClick={() => handleClick('/researcher')}>Researcher<br/></li>
                          <li onClick={() => handleClick('/admin')}>Admin<br/></li>
                      </ul>
                  </div>
                  <div className="col-md-6">
                      <h5><b>Contact Info</b></h5>
                      <p>Address: BUET</p>
                      <p>Email: <br/>altairahad001@gmail.com<br/>sahaamit20002@gmail.com</p>
                      <p>Phone: 01555555555</p>
                  </div>
              </div>
          </div>
          <div className="text-center mt-3">
              <p>&copy; {new Date().getFullYear()} NEXUSMEDS. ALL RIGHTS RESERVED</p>
          </div>
      </footer>
  );
};




function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchResults, setSearchResults] = useState([]);


  const setAuth = (boolean) => {
    console.log('Setting auth to:', boolean);
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    }
    catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    isAuth();

    // if the path is not /searchResults, then clear the search results
    if (window.location.pathname !== '/searchResults') {
      setSearchResults([]);
    }
  }, []);





  return (
    <div className="App" style={{ fontFamily: 'Roboto Mono, monospace', fontFamily: 'Roboto Slab, serif', backgroundColor: '#f9fdff'}}>
      {/* <h1 className="text-center mt-5">NEXUSMEDS</h1> */}
      <br></br>
      <NAVBAR isLoggedIn={isAuthenticated} setAuth={setAuth} searchResult={searchResults}/>


      <div>

        <ToastContainer />
        <Router>
          <Routes>
            <Route path='/searchResults' element={<SEARCHRESULTS medicineList={searchResults} />} />
            <Route path='/searchResults-chem' element={<CHEMRESULTSEARCH />} />
            <Route path="/placeorder" element={<PLACE_ORDER />} />
            <Route path="/cart" element={<CART />} />
            <Route path="/viewotc" element={<INDICATIONS />} />
            <Route path="/sorry" element={<SorryPage />} />
            <Route path="/viewotc/:indication" element={<VIEWOTC />} />
            <Route path="/prescriptionmeds" element={<VIEWPRESCRIPTIONMEDS />} />

            <Route path="/admin-home" element={<STATISTICS />} />
            
            <Route path='/viewmedicines' element={<VIEWMEDICINES />} />
            <Route path='/all-chemicals' element={<VIEWCHEMICALS />} />
            <Route path="/approve/orders" element={<ADMIN_APPROVE_ORDERS />} />
            <Route path="/approveSpecificOrder" element={<ADMIN_APPROVE_SPECIFIC_ORDER />} />
            <Route path='/approve/researchers' element={<ADMIN_APPROVE_RESEARCHERS />} />
            <Route path='/all-products' element={<ALLPRODUCTS />} />


            <Route path='/all-researchers' element={<VIEWRESEARCHERS />} />
            <Route path='/all-customers' element={<VIEWUSERS />} />



            <Route path='/specificChemical/:id' element={<SPECIFIC_CHEMICAL />} />
            <Route path="/researcher_cart" element={<RESEARCHER_CART />} />
            <Route path="/researcher_placeorder" element={<RESEARCHER_PLACE_ORDER />} />
            <Route path="/researcher_order_confirmation" element={<RESEARCHER_ORDER_CONFIRMATION />} />
            <Route path='/admin_specificChem/:id' element={<ADMIN_SPECIFICCHEM />} />
            <Route path='/admin_specificMed/:id' element={<ADMIN_MEDSPECIFIC />} />
            <Route path='/add-medicine' element={<ADD_MEDICINE />} />
            <Route path='/add-chemical' element={<ADD_CHEMICAL />} />


            <Route path='/inventory' element={<INVENTORY />} />


            <Route path='/admin' element={<ADMIN />} />
            <Route path='/researcher' element={<RESEARCHER setAuth={setAuth}/>} />

            <Route path="/" element={<HOMEPAGE />} />
            <Route
              path="/signin"
              element={
                !isAuthenticated ? (
                  <SIGNIN setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/signup"
              element={

                !isAuthenticated ? (
                  <SIGNUP setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" />
                )

              }
            />
            <Route path="/editprofile" element={<EDITPROFILE />} />

            <Route path="/viewusers" element={<VIEWUSERS />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <DASHBOARD setAuth={setAuth} />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />




            <Route path="/specificmedicine/:id" element={<MEDSPECIFIC isLoggedIn={isAuthenticated} setAuth={setAuth} />} />
            <Route path="/specific_chemical/:id" element={<SPECIFIC_CHEMICAL />} />

          </Routes>
        </Router>



      </div>
              <Footer />
    </div>
  );
}

export default App;
