import React, { Component } from 'react';
// import logo2 from './logo2.svg';
import MainBody from "../components/contacts/MainBody"
import NavBar from "../components/contacts/NavBar"
import { LinearGradient } from 'expo-linear-gradient';
// import '../App.css';
import SelectContact from '../components/contacts/SelectContact';
import FacebookButton from './../components/contacts/FacebookButton';
import { View, Image, StyleSheet } from "react-native";
import { Button, ThemeProvider } from 'react-native-elements';



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

AppLogo: {
  marginTop: '10%',
  width: '80%',
  height: 52
},

nextPage: {
  width: 250,
  marginTop: 100,
  backgroundColor: "#010d25",
  borderWidth: 2,
  borderColor: "#2699FB",
  borderRadius: 25,
  padding: 5
},

// li: {
//     // display: 'inlineBlock',
//     fontFamily: 'proxima-nova,sansSerif',
//     fontWeight: '700',
//     fontStyle: 'normal',
//     fontSize: 22,
// },

// a: {
//   // display: 'block',
//   padding: 8,
//   textAlign: 'center',
//   // textDecoration: 'none',
//   color: 'white',
//   /* background-color: #dddddd; */
// },

// ul: {
//   margin: '10',
//   padding: '0',
//   overflow: 'hidden',
//   backgroundColor: '#2699FB',
//   justifyContent: 'center',
//   alignItems: 'flex-start',
// }



})


class Contact extends Component {
  goToNextPage = () => {
    this.props.navigation.navigate('Friends');
  }

  render() {
    return (
      <View className="App" >
        <View className="AppHeader">
        <LinearGradient
          colors={['#010d25', '#0f345a', '#124375', '#124375', '#0f345a', '#010d25']}
          style={{ width: '100%', height: '200%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
         <Image source={require('../../assets/HayLogoHorz.png')} style={styles.AppLogo} className="AppLogo" alt="logo" />
          {/* <NavBar /> */}
          {/* <MainBody /> */}
          <Button title="next page" type="clear" style={styles.nextPage} className="nextPage" onPress={this.goToNextPage}></Button>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

export default Contact
