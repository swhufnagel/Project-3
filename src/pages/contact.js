import React from 'react';
// import logo2 from './logo2.svg';
import MainBody from "../components/contacts/MainBody"
import NavBar from "../components/contacts/NavBar"
// import '../App.css';
import SelectContact from '../components/contacts/SelectContact';
import FacebookButton from './../components/contacts/FacebookButton';
import { View, Img, StyleSheet } from "react-native";

const styles = StyleSheet.create({
App: {
  // backgroundSize: '200%',
  height: '100%'
},

AppHeader: {
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
},

logo: {
  // margintop: '10%',
},

li: {
    // display: 'inlineBlock',
    fontFamily: 'proxima-nova,sansSerif',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 22,
},

a: {
  // display: 'block',
  padding: 8,
  textAlign: 'center',
  // textDecoration: 'none',
  color: 'white',
  /* background-color: #dddddd; */
},

ul: {
  margin: '10',
  padding: '0',
  overflow: 'hidden',
  backgroundColor: '#2699FB',
  justifyContent: 'center',
  alignItems: 'flex-start',
}



})

function Contact() {
  return (
    <View style={styles.App} className="App">
      <View style={styles.AppHeader} className="App-header">
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
