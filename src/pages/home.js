import React, { Component } from 'react';
import FacebookButton from '../components/home/FacebookButton'
import MainBody from "../components/home/MainBody"
import GoogleButton from "../components/home/GoogleButton"
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { AuthSession } from 'expo';
import { Constants } from 'expo';
import jwtDecode from 'jwt-decode';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, ThemeProvider } from 'react-native-elements';
import * as Permissions from "expo-permissions";
import * as Contacts from "expo-contacts";


function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
class Home extends Component {
  // static navigationOptions = {
  //   title: 'Home'
  // };
  // const { navigate } = this.props.navigation;
  state = {
    text: "",
    name: null,
    contacts: []
  }
  permissionFlow = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    this.setState({ status: status });
    if (status !== "granted") {
      console.log("status:", status);
      alert("You will need to enable contacts to use our app!");
      return;
    }
    //get data
    const { data } = await Contacts.getContactsAsync({});
    console.log(data);
    this.setState({ contacts: data });
  };
  _loginWithAuth0 = async () => {
    const auth0Domain = "https://dev-ph5frrsm.auth0.com";
    const auth0ClientId = "Jv5yuTYSdW5MFJ50z0EsuVv1z58LgQI5";
    const redirectUrl = AuthSession.getRedirectUrl();
    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: 'id_token', // id_token will return a JWT token
      scope: 'openid profile', // retrieve the user's profile
      nonce: 'nonce', // ideally, this will be a random value
    });
    let authUrl = `${auth0Domain}/authorize` + queryParams;

    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    console.log(`AuthURL is:  ${authUrl}`);
    const response = await AuthSession.startAsync({
      authUrl: authUrl
    });
    console.log('response ', response);
    if (response.type === 'success') {
      this.handleResponse(response.params);
    }
  };
  handleResponse = (response) => {
    if (response.error) {
      Alert('Authentication error', response.error_description || 'something went wrong');
      return;
    }

    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);

    const { name } = decoded;
    this.setState({ name });
    this.props.navigation.navigate('Contact');
    this.permissionFlow();
  }
  render() {
    const { navigate } = this.props.navigation;
    const { name } = this.state;
    
    const styles = StyleSheet.create({
      App: {
      //   // backgroundImage: linearGradient(125deg, #010d25, #0f345a, #124375, #124375, #0f345a, #010d25),
      //   // backgroundSize: '200%',
      //   // animation: bganimation 15s infinite,
        height: '200%'
      },
      // AppHeader: {
      //   // minHeight: '200%',
      //   display: 'flex',
      //   // flexDirection: 'column',
      //   alignItems: 'center'
      // },

      AppLogo: {
        marginTop: '15%',
        width: 250,
        height: 250
      },

      changePage: {
        width: 250,
        marginTop: 100,
      },

      LoginButton: {
        width: 250,
        marginTop: '10%',
        // padding: '5%',
        // borderRadius: 30,
        // borderColor: '#2699FB',
        // cursor: 'pointer',
        // backgroundColor: '#175897',
        // fontWeight: '700',
        // fontStyle: 'normal',
        // fontSize: 22,
        // color: 'white',
      },

      // buttonArea: {
      //   display: 'flex'
      // }
    })

    return (
      <View style={styles.App} className="App" >
      <View style={styles.AppHeader} className="AppHeader">
      <LinearGradient
      colors={['#010d25', '#0f345a', '#124375', '#124375', '#0f345a', '#010d25']}
      style={{ width: '100%', height: '200%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
      <Image source={require('../../assets/HayLogoVert.png')} style={styles.AppLogo} className="AppLogo" alt="logo" />
            {/* <MainBody /> */}
      <Button title="Change Page" style={styles.changePage} className="changePage" onPress={() => navigate('Contact')} />
            {name ?
              <Text >You are logged in, {name}!</Text> :
              <Button style={styles.LoginButton} title="Login" navigation={this.props.navigation}
                onPress={() => this._loginWithAuth0()} />
            }
            {/* <Button title="View Friends" onPress={() => navigate("Friends", {})} /> */}
         
         
       </LinearGradient>
       </View>
      </View>
    );
  }
}
export default Home;
