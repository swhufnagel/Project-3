import React from 'react';
import logo from './logo.svg';
import FacebookButton from './components/home/FacebookButton'
// import MainBody from "./components/MainBody"
import GoogleButton from "./components/home/GoogleButton"
import './App.css';
import { Button } from 'react-native'


function Home() {
  // static navigationOptions = {
  //   title: 'Home'
  // };
  const {navigate} = this.props.navigations;
  return (
   <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <MainBody /> */}
        <GoogleButton />
        <FacebookButton />
        <Button title="View Friends" onPress={() => navigate("Friends", {})} />
    </div>
 </div>
  );
}

export default Home;
