import React, { Component } from 'react';
// import logo2 from './logo2.svg';
import FacebookButton from '../components/friends/FacebookButton'
import MainBody from "../components/friends/MainBody"
import GoogleButton from "../components/friends/GoogleButton"
import NavBar from "../components/friends/NavBar"
// import '../App.css';
import SelectContact from '../components/friends/SelectContact';
import FriendImg from '../components/friends/FriendImg';
import { LinearGradient } from 'expo-linear-gradient';
import CallButton from '../components/friends/CallButton';
import TextButton from '../components/friends/TextButton';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, ThemeProvider } from 'react-native-elements';




const styles = StyleSheet.create({
  App: {
    // backgroundImage: linear - gradient(125deg, #010d25, #0f345a, #124375, #124375, #0f345a, #010d25);
    // backgroundSize: '200%',
    // animation: bganimation 15s infinite;
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

  // buttonArea: {
  //   display: 'flex'
  // },
  
  Call: {
    width: 250,
    marginTop: 50,
    backgroundColor: "#010d25",
    borderWidth: 2,
    borderColor: "#2699FB",
    borderRadius: 25,
    padding: 5
  },

  Text: {
    borderWidth: 2,
    borderColor: "#2699FB",
    width: 250,
    marginTop: 25,
    backgroundColor: "#010d25",
    borderRadius: 25,
    padding: 5
  }
})
// function Friends() {
  class Friends extends Component {
    render () {
  return (
    
    <View style={styles.App} className="App">
      <View style={styles.AppHeader} className="AppHeader">
        <LinearGradient
          colors={['#010d25', '#0f345a', '#124375', '#124375', '#0f345a', '#010d25']}
          style={{ width: '100%', height: '200%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
        <Image source={require('../../assets/HayLogoHorz.png')} style={styles.AppLogo} className="AppLogo" alt="logo" />
        <Image
          source={require('../../assets/melanie-person.jpg')}
          style={{ width: 200, height: 200, borderRadius: 100, marginTop: 25 }} />
        <MainBody />
        <View style={styles.buttonArea} className="buttonArea">
        <Button title="Call" style={styles.Call} type="clear" className="Call" onPress={this.goToNextPage}></Button>
        <Button title="Text" style={styles.Text} type="clear" className="Text" onPress={this.goToNextPage}></Button>
        </View>
        </LinearGradient>
      </View>
    </View>
    
    );
  }
}

export default Friends
