import React from 'react';
import logo2 from './logo2.svg';
import FacebookButton from './components/friends/FacebookButton'
import MainBody from "./components/friends/MainBody"
import GoogleButton from "./components/friends/GoogleButton"
import NavBar from "./components/friends/NavBar"
// import './App.css';
import SelectContact from './components/friends/SelectContact';
import FriendImg from './components/friends/FriendImg';
import CallButton from './components/friends/CallButton';
import TextButton from './components/friends/TextButton';


function Friends() {
  return (
   <div className="App">
      <div className="App-header">
        <img src={logo2} className="App-logo2" alt="logo" />
        {/* <NavBar /> */}
        
        <FriendImg />
        <MainBody />
      <div className="buttonArea">
        <CallButton />
        <TextButton />
      </div>
        {/* <SelectContact /> */}
        {/* <GoogleButton /> */}
        {/* <FacebookButton /> */}
    </div>
 </div>
  );
}

export default Friends;
