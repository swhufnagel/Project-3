import React from 'react';
// import logo2 from './logo2.svg';
import FacebookButton from '../components/friends/FacebookButton'
import MainBody from "../components/friends/MainBody"
import GoogleButton from "../components/friends/GoogleButton"
import NavBar from "../components/friends/NavBar"
// import '../App.css';
import SelectContact from '../components/friends/SelectContact';
import FriendImg from '../components/friends/FriendImg';
import CallButton from '../components/friends/CallButton';
import TextButton from '../components/friends/TextButton';
import { Img, View, Text, StyleSheet, TouchableOpacity } from 'react-native'


import { View, Img , StyleSheet } from "react-native";

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

  buttonArea: {
    display: 'flex'
  }
})
function Friends() {
  return (
    <View style={styles.App} className="App">
      <View style={styles.AppHeader} className="App-header">
        {/* <Img src={""} className="App-logo2" alt="logo" /> */}
        {/* <NavBar /> */}

        {/* <FriendImg /> */}
        <MainBody />
        <View style={styles.buttonArea} className="buttonArea">
          <CallButton />
          <TextButton />
        </View>
        {/* <SelectContact /> */}
        {/* <GoogleButton /> */}
        {/* <FacebookButton /> */}
      </View>
    </View>
  );
}

export default Friends;
