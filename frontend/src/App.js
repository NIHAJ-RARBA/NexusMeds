import React from 'react';
import { Routes, link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect, Navigate } from 'react-router-dom';

import HOMEPAGE from './components/homepage';
import SIGNIN from './components/signin';
import SIGNUP from './components/signup';
import EDITPROFILE from './components/editprofile';
import VIEWUSERS from './components/viewusers';

import './App.css';

function App() {

  

  
  return (
    <div className="App">
      <h1 className="text-center mt-5">NEXUSMEDS</h1>
      <Router>
        <Routes>
          <Route path="/" element={<HOMEPAGE />} />
          <Route path="/signin" element={<SIGNIN />} />
          <Route path="/signup" element={<SIGNUP />} />
          <Route path="/editprofile" element={<EDITPROFILE />} />
          <Route path="/viewusers" element={<VIEWUSERS />} />
        </Routes>
      </Router>




    </div>
  );
}

export default App;
