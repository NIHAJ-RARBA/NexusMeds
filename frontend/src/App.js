import React from 'react';
import { Routes, link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HOMEPAGE from './components/homepage';
import SIGNIN from './components/signin';
import SIGNUP from './components/signup';
import EDITPROFILE from './components/editprofile';
import VIEWUSERS from './components/viewusers';
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
import SEARCHRESULTS from './components/medicine/searchResults';



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
    <div className="App" style={{ fontFamily: 'Roboto Mono, monospace', fontFamily: 'Roboto Slab, serif' }}>
      {/* <h1 className="text-center mt-5">NEXUSMEDS</h1> */}
      <br></br>
      <NAVBAR isLoggedIn={isAuthenticated} setAuth={setAuth} searchResult={searchResults} />


      <div>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path='/searchResults' element={<SEARCHRESULTS medicineList={searchResults} />} />
            <Route path="/placeorder" element={<PLACE_ORDER />} />
            <Route path="/cart" element={<CART />} />
            <Route path="/viewotc" element={<INDICATIONS />} />
            <Route path="/sorry" element={<SorryPage />} />
            <Route path="/viewotc/:indication" element={<VIEWOTC />} />
            <Route path="/prescriptionmeds" element={<VIEWPRESCRIPTIONMEDS />} />
            <Route path="/approve/orders" element={<ADMIN_APPROVE_ORDERS />} />
            <Route path="/approveSpecificOrder" element={<ADMIN_APPROVE_SPECIFIC_ORDER />} />


            <Route path='/admin' element={<ADMIN />} />

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

          </Routes>
        </Router>


      </div>

    </div>
  );
}

export default App;
