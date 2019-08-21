import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AuthSession } from "expo";
import jwtDecode from "jwt-decode";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeProvider, Divider, Button } from "react-native-elements";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from 'react-native-elements'
import * as Permissions from "expo-permissions";
import * as Contacts from "expo-contacts";
import createAuth0Client from '@auth0/auth0-spa-js';
// import { Asset, Font } from "expo";
import * as Font from 'expo-font';




// Custom Font 
// constructor(props) {
//   super(props);
//   this.state = {
//   fontLoaded: false
// }
// }
// async componenentDidMount() {
//   await Font.loadAsync({
//     'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
//   }).then(() => {
//     this.setState({fontLoaded: true})
//   })
// }
// { this.state.fontLoaded == true ? (

// )}

// Custom Font End
import LogoTitle from "../components/contacts/LogoTitle";

const YOUR_NGROK_LINK = "http://09b85fda.ngrok.io";


function toQueryString(params) {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}
class Home extends Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Merriweather-Regular': require('../../assets/fonts/Merriweather-Regular.ttf'),
      'Merriweather-Bold': require('../../assets/fonts/Merriweather-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#124375",
        marginRight: "2%",
        marginLeft: "2%"
      },
      headerTitle: (
        <Image style={{ width: 200, height: 30 }} source={require('../../assets/HayLogoHorz3.png')} className="AppLogo" alt="logo" />
      )
    };
  }



  state = {
    text: "",
    name: null,
    contacts: []
  };
  _loginWithAuth0 = async () => {
    const auth0Domain = "https://dev-ph5frrsm.auth0.com";
    const auth0ClientId = "Jv5yuTYSdW5MFJ50z0EsuVv1z58LgQI5";
    const redirectUrl = AuthSession.getRedirectUrl();
    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: "id_token", // id_token will return a JWT token
      scope: "openid profile email", // retrieve the user's profile
      nonce: "nonce" // ideally, this will be a random value
    });
    let authUrl = `${auth0Domain}/authorize` + queryParams;

    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    console.log(`AuthURL is:  ${authUrl}`);
    const response = await AuthSession.startAsync({
      authUrl: authUrl
    });
    if (response.type === "success") {
      this.handleResponse(response.params);
    }
  };
  handleResponse = response => {
    if (response.error) {
      Alert(
        "Authentication error",
        response.error_description || "something went wrong"
      );
      return;
    }
    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);
    console.log("scopes: ", decoded);
    const { name } = decoded;
    this.setState({ name });
    this.props.navigation.navigate("Contact");
    // Make a user
    this.createUser(decoded);
  };

  createUser = async decoded => {
    let user = {
      iss: decoded.iss,
      nickname: decoded.nickname,
      contacts: []
    };
    // console.log("USer:", user);

    await fetch(YOUR_NGROK_LINK + "/users/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).catch(function (err) {
      console.log("Error:", err);
      return err;
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { name } = this.state;



    const styles = StyleSheet.create({
      App: {
        //   // backgroundImage: linearGradient(125deg, #010d25, #0f345a, #124375, #124375, #0f345a, #010d25),
        //   // backgroundSize: '200%',
        //   // animation: bganimation 15s infinite,

        height: "200%"
      },
      AppLogo: {
        marginTop: "15%",
        width: 250,
        height: 250
      },

      buttonStyle: {
        width: 250,
        marginTop: 100,
        borderRadius: 25,
        backgroundColor: "#010d25",
        borderBottomColor: "#175084",
        borderRightColor: "#175084",
        padding: 5,
        borderWidth: 2,
        borderColor: "#2699FB",
      },

      LoginButton: {
        width: 250,
        marginTop: 130,
        borderRadius: 25,
        borderBottomColor: "#175084",
        borderRightColor: "#175084",
        padding: 5,
        backgroundColor: "#010d25",
        borderWidth: 2,
        borderColor: "#2699FB",
        fontFamily: this.state.fontLoaded ? 'Merriweather-Regular' : '',
        color: '#efefef',
      }
    });

    console.log(styles.LoginButton)

    return (
      <ThemeProvider>
        <View style={styles.App} className="App" >

          <LinearGradient
            colors={['#010d25', '#0f345a', '#124375']}
            style={{ width: '100%', height: '100%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
            <Image source={require('../../assets/HayLogoVert3.png')} style={styles.AppLogo} className="AppLogo" alt="logo" />
            {name ?
              <Text style={{ fontSize: 22, color: "white", marginTop: 25 }}>You are logged in, {name}!</Text> :
              <Button style={[styles.LoginButton]} title="Login" type="clear" navigation={this.props.navigation} onPress={this._loginWithAuth0} />
            }

          </LinearGradient>

        </View>
      </ThemeProvider>
    );
  }
}

export default Home;
