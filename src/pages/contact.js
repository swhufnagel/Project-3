import React from 'react';
import logo2 from './logo2.svg';

import MainBody from "./components/contacts/MainBody"

import NavBar from "./components/contacts/NavBar"
import './App.css';
import SelectContact from './components/contacts/SelectContact';
import FacebookButton from './components/FacebookButton';


function Contact() {
  return (
   <div className="App">
      <div className="App-header">
        <img src={logo2} className="App-logo2" alt="logo" />
        <NavBar />
        <MainBody />
        <SelectContact />
        {/* <FacebookButton /> */}
    </div>
 </div>
  );
}

export default Contact;
