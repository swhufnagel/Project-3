import React, { Component } from 'react';
// import logo from './logo.svg';
import FacebookButton from '../components/home/FacebookButton'
import MainBody from "../components/home/MainBody"
import GoogleButton from "../components/home/GoogleButton"
// import './App.css'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, ThemeProvider } from 'react-native-elements';
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
  }
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
  }
  render() {
    const { name } = this.state;
    const styles = StyleSheet.create({
      App: {
        // backgroundImage: linearGradient(125deg, #010d25, #0f345a, #124375, #124375, #0f345a, #010d25),
        // backgroundSize: '200%',
        // animation: bganimation 15s infinite,
        height: '100%'
      },
      AppHeader: {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      LoginButton: {
        width: '75%',
        marginTop: '50%',
        padding: '5%',
        borderRadius: 30,
        borderColor: '#2699FB',
        // cursor: 'pointer',
        backgroundColor: '#175897',
        fontWeight: '700',
        fontStyle: 'normal',
        fontSize: 22,
        color: 'white',
      },

      buttonArea: {
        display: 'flex'
      }
    })

    return (
      <View style={styles.App} className="App" >
        <View style={styles.AppHeader} className="App-header">
          <LinearGradient
            colors={['#010d25', '#0f345a', '#124375', '#124375', '#0f345a', '#010d25']}
            style={{ width: '100%', height: '100%', padding: 15, alignItems: 'center', borderRadius: 5 }}>
            {/* <img src={""} className="App-logo" alt="logo" /> */}
            <MainBody />

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
