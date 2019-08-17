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
import call from "react-native-phone-call";
import Communications from "react-native-communications";
import RNShake from 'react-native-shake';
import * as Contacts from "expo-contacts";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


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
    width: '100%',
  },

  AppLogo: {
    marginTop: '10%',
    width: '90%',
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
    borderBottomColor: "#175084",
    borderRightColor: "#175084",
    borderRadius: 25,
    padding: 5
  },

  Text: {
    borderWidth: 2,
    borderColor: "#2699FB",
    borderBottomColor: "#175084",
    borderRightColor: "#175084",
    width: 250,
    marginTop: 25,
    backgroundColor: "#010d25",
    borderRadius: 25,
    padding: 5
  }
})
class Friends extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPhoto: 'https://i.pravatar.cc/300?img=',
      currentName: "",
      currentNumber: null,
      contacts: [],
      randomContact: {},
      done: false,
    }
  }
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    console.log("updated", this.state.currentPhoto);
    if (this.props.loadRandom === true && this.state.done === false) {
      console.log("running");
      this.getContacts();
    }
  }
  componentDidMount = async () => {
  }
  componentWillMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      console.log('shook')
      this.getRandomContact();
    });
  }
  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
  }

  getContacts = () => {
    this.setState({ contacts: this.props.contacts }, () => {
      // console.log("contacts up here ", this.state.contacts);
      this.getRandomContact();
    })
    this.setState({ done: true }, () => {
      console.log("is it done ", this.state.done);
    })
  }
  getRandomContact = () => {
    let randomNum = Math.floor((Math.random() * this.props.contacts.length));
    let randomContact = this.props.contacts[randomNum];
    this.setState({ currentPhoto: 'https://i.pravatar.cc/300?img=' + randomNum })
    // console.log("rando ", randomContact);
    this.setState({ randomContact: randomContact })
    console.log("random cont ", randomContact);
    console.log("random num ", randomNum);
    console.log(randomContact.phoneNumbers[0].digits);
    // alert(randomContact.name);
    // this.setState({ Alert_Visibility: true });
    this.setState({ currentName: randomContact.name });
    this.setState({
      currentNumber: randomContact.phoneNumbers[0].digits
    });

    // this.callContact(randomContact.phoneNumbers[0].number, true)
  };
  callContact = () => {
    const contact = {
      // number: this.state.currentNumber, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    call(contact).catch(console.error);
  };
  textContact = () => {
    // Communications.text(this.state.currentNumber, "Test Text Here");
  };

  render() {
    return (
      <View style={styles.App} className="App">
        <View style={styles.AppHeader} className="AppHeader">
          <GestureRecognizer
            onSwipeUp={this.getRandomContact}
          >
            <LinearGradient
              colors={['#010d25', '#0f345a', '#124375', '#124375', '#0f345a', '#010d25']}
              style={{ width: '100%', height: '200%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
              <Image source={require('../../assets/HayLogoHorz4.png')} style={styles.AppLogo} className="AppLogo" alt="logo" />
              <Image
                source={{ uri: this.state.currentPhoto }}
                style={{ width: 200, height: 200, borderRadius: 100, marginTop: 25 }} />

              <Text style={{ color: 'white' }}> {this.state.currentName} </Text>
              <Text style={{ color: 'white' }}> {this.state.currentNumber} </Text>
              <View style={styles.buttonArea} className="buttonArea">
                <Button title="Call" style={styles.Call} type="clear" className="Call" onPress={this.callContact}></Button>
                <Button title="Text" style={styles.Text} type="clear" className="Text" onPress={this.textContact.bind(this)}></Button>
              </View>
            </LinearGradient>
          </GestureRecognizer>
        </View>
      </View>

    );
  }
}

export default Friends
