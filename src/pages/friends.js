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
    marginTop: '15%',
    width: '120%',
    height: 52
  },

  // buttonArea: {
  //   display: 'flex'
  // },
  
  Call: {
    width: 250,
    marginTop: 100
  },

  Text: {
    width: 250,
    marginTop: 25
  }
})
// function Friends() {
  class Friends extends Component {
    render () {
  return (
    <LinearGradient
      colors={['#010d25', '#0f345a', '#124375', '#124375', '#0f345a', '#010d25']}
      style={{ width: '100%', height: '200%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
    <View style={styles.App} className="App">
      <View style={styles.AppHeader} className="AppHeader">
      <Image source={require('../../assets/HayLogoHorz.png')} style={styles.AppLogo} className="AppLogo" alt="logo" />
        {/* <Img src={""} className="App-logo2" alt="logo" /> */}
        {/* <NavBar /> */}

        {/* <FriendImg /> */}
        {/* <MainBody /> */}
        <View style={styles.buttonArea} className="buttonArea">
        <Button title="Call" style={styles.Call} className="Call" onPress={this.goToNextPage}></Button>
        <Button title="Text" style={styles.Text} className="Text" onPress={this.goToNextPage}></Button>
          {/* <CallButton />
          <TextButton /> */}
        </View>
        {/* <SelectContact /> */}
        {/* <GoogleButton /> */}
        {/* <FacebookButton /> */}
      </View>
    </View>
    </LinearGradient>
    );
  }
}

export default Friends
