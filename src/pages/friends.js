import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, ThemeProvider } from 'react-native-elements';
import call from "react-native-phone-call";
import Communications from "react-native-communications";
import RNShake from 'react-native-shake';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { AuthSession } from 'expo';



const styles = StyleSheet.create({
  App: {
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
    width: '60%',
    alignItems: 'center',
    height: 52
  },
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
    if (this.props.loadRandom === true && this.state.done === false) {
      this.getContacts();
    }
  }
  componentDidMount = async () => {
    AuthSession.dismiss();
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
      let includedContacts = this.props.contacts.filter((item) => {
        return item.switch === true;
      })
      this.setState({ includedContacts: includedContacts }, () => {
        this.getRandomContact();
      })
    })
    this.setState({ done: true }, () => {
      // console.log("is it done ", this.state.done);
    })
  }
  getRandomContact = () => {
    let randomNum = Math.floor((Math.random() * this.state.includedContacts.length));
    let randomContact = this.state.includedContacts[randomNum];
    console.log("random contact ", randomContact);
    this.setState({ randomContact: randomContact });
    this.setState({ currentName: randomContact.name });
    this.setState({
      currentNumber: randomContact.phoneNumbers[0].digits ?
        randomContact.phoneNumbers[0].digits : "no number found"
    });
    this.setState({
      currentPhoto: randomContact.imageAvailable ?
        randomContact.image.uri :
        'https://i.pravatar.cc/300?img=' + randomNum
    })

  };
  callContact = () => {
    const contact = {
      number: this.state.currentNumber, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    call(contact).catch(console.error);
  };
  textContact = () => {
    Communications.text(this.state.currentNumber, "Test Text Here");
  };

  render() {
    return (
      <View style={styles.App} className="App">
        <View style={styles.AppHeader} className="AppHeader">
          <GestureRecognizer
            onSwipeUp={this.getRandomContact}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']}
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
