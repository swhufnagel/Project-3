import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { AuthSession } from "expo";
import jwtDecode from "jwt-decode";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeProvider, Divider, Button } from "react-native-elements";
import LogoTitle from "../components/contacts/LogoTitle";
import * as Contacts from "expo-contacts";

const YOUR_NGROK_LINK = "http://150a151a.ngrok.io";

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
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle />
    };
  };
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
    this.storeContacts(decoded);
  };

  // Create user in db
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
    }).catch(function(err) {
      console.log("Error:", err);
      return err;
    });
  };

  // Save Contacts for db post request
  storeContacts = async decoded => {
    // Returns an array of objects for each contact
    const results = await Contacts.getContactsAsync({});
    let { data } = results;

    let contacts = [];

    data.map(obj => {
      let phoneInfo;
      phoneInfo = obj.phoneNumbers;

      if (Array.isArray(obj.phoneNumbers)) {
        phoneInfo = obj.phoneNumbers[0].digits;
        let contact = {
          owner: decoded.iss,
          id: obj.id,
          name: obj.name,
          remind: false,
          number: phoneInfo
        };
        contacts.push(contact);
      } else {
        // console.log("is not an array:", obj);
      }
    });

    await fetch(YOUR_NGROK_LINK + "/contacts/store", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contacts)
    }).catch(function(err) {
      console.log("Error:", err);
      return err;
    });
  }; // End saveContacts

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
      // AppHeader: {
      //   // minHeight: '200%',
      //   display: 'flex',
      //   // flexDirection: 'column',
      //   alignItems: 'center'
      // },

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
        borderColor: "#2699FB"
      },

      LoginButton: {
        width: 250,
        marginTop: 40,
        borderRadius: 25,
        borderBottomColor: "#175084",
        borderRightColor: "#175084",
        padding: 5,
        backgroundColor: "#010d25",
        borderWidth: 2,
        borderColor: "#2699FB"
      }

      // buttonArea: {
      //   display: 'flex'
      // }
    });

    return (
      <ThemeProvider>
        <View style={styles.App} className="App">
          <View style={styles.AppHeader} className="AppHeader">
            <LinearGradient
              colors={["#010d25", "#0f345a", "#124375"]}
              // 722211 , ef9337 ,efb560 - orange
              // 010d25, 0f345a, 124375 - blue
              // 35302c, 4c3825, 7f4d1f -brown
              style={{
                width: "100%",
                height: "100%",
                padding: 0,
                alignItems: "center",
                borderRadius: 0
              }}
            >
              <Image
                source={require("../../assets/HayLogoVertOrange.png")}
                style={styles.AppLogo}
                className="AppLogo"
                alt="logo"
              />
              <Button
                style={styles.LoginButton}
                title="Login"
                type="clear"
                navigation={this.props.navigation}
                onPress={this._loginWithAuth0}
              />
            </LinearGradient>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

export default Home;
