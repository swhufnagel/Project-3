import React, { Component } from 'react';
// import logo2 from './logo2.svg';
import MainBody from "../components/contacts/MainBody"
import NavBar from "../components/contacts/NavBar"
// import '../App.css';
import SelectContact from '../components/contacts/SelectContact';
import FacebookButton from './../components/contacts/FacebookButton';
import { Button, Text, View, Img } from "react-native";


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
