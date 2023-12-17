import React, { useState } from 'react';
import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './login/LoginForm';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Organization from './Organization/Organization';
import AddOrganization from './AddOrganization';

function App() {
  return (
    <React.Fragment>
 <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Organization" element={<Organization />} />
        <Route path="/AddOrganization" element={<AddOrganization/>} />

    
      </Routes>
    </React.Fragment>
  );
}

export default App;



