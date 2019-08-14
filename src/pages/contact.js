import React, { Component } from 'react';
// import logo2 from './logo2.svg';
import MainBody from "../components/contacts/MainBody"
import NavBar from "../components/contacts/NavBar"
// import '../App.css';
import SelectContact from '../components/contacts/SelectContact';
import FacebookButton from './../components/contacts/FacebookButton';

import { Button, View, Img, StyleSheet } from "react-native";



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


class Contact extends Component {
  goToNextPage = () => {
    this.props.navigation.navigate('Friends');
  }

  render() {
    return (
      <View className="App" >
        <View className="App-header">
          {/* <Img src={""} className="App-logo2" alt="logo" /> */}
          <NavBar />
          <MainBody />
          <Button title="next page" onPress={this.goToNextPage}></Button>
        </View>
      </View>
    );
  }
}

export default Contact;
