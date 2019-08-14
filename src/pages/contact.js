import React from 'react';
// import logo2 from './logo2.svg';
import MainBody from "../components/contacts/MainBody"
import NavBar from "../components/contacts/NavBar"
// import '../App.css';
import SelectContact from '../components/contacts/SelectContact';
import FacebookButton from './../components/contacts/FacebookButton';
import { View, Img } from "react-native";


function Contact() {
  return (
    <View className="App">
      <View className="App-header">
        <Img src={""} className="App-logo2" alt="logo" />
        <NavBar />
        <MainBody />
        <SelectContact />
        <FacebookButton />
      </View>
    </View>
  );
}

export default Contact;
