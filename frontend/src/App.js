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



import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [medID, setMedID] = useState(0);
  const [chemId, setChemId] = useState(0);

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
  }, []);





  return (
    <div className="App" style={{ fontFamily: 'Roboto Mono, monospace', fontFamily: 'Roboto Slab, serif' }}>
      {/* <h1 className="text-center mt-5">NEXUSMEDS</h1> */}
      <NAVBAR />
      <div style={{ marginTop: '115px' }}>
      <ToastContainer />
      <Router>
        <Routes>
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

          <Route path="/specificmedicine" element={<MEDSPECIFIC />} />

        </Routes>
      </Router>


      </div>

    </div>
  );
}

export default App;
