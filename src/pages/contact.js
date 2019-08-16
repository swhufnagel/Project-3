import React, { Component } from "react";
// import logo2 from './logo2.svg';
import MainBody from "../components/contacts/MainBody";
import NavBar from "../components/contacts/NavBar";
import { LinearGradient } from "expo-linear-gradient";
// import '../App.css';
import SelectContact from "../components/contacts/SelectContact";
import FacebookButton from "./../components/contacts/FacebookButton";
import { View, Image, StyleSheet } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as Contacts from "expo-contacts";
import { Switch, ScrollView, FlatList, Img, Text } from "react-native";
import { ContactList } from "../components/contacts/List";
import { ListItem, Overlay } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale

const YOUR_NGROK_LINK = "http://7babc0c7.ngrok.io";

const styles = StyleSheet.create({
  App: {
    // backgroundSize: '200%',
    height: "100%"
  },

  AppHeader: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  AppLogo: {
    marginTop: "10%",
    width: "80%",
    height: 52
  },

  nextPage: {
    width: 250,
    marginTop: 100,
    backgroundColor: "#010d25",
    borderWidth: 2,
    borderColor: "#2699FB",
    borderBottomColor: "#175084",
    borderRightColor: "#175084",
    borderRadius: 25,
    padding: 5
  }

  // li: {
  //     // display: 'inlineBlock',
  //     fontFamily: 'proxima-nova,sansSerif',
  //     fontWeight: '700',
  //     fontStyle: 'normal',
  //     fontSize: 22,
  // },

  // a: {
  //   // display: 'block',
  //   padding: 8,
  //   textAlign: 'center',
  //   // textDecoration: 'none',
  //   color: 'white',
  //   /* background-color: #dddddd; */
  // },

  // ul: {
  //   margin: '10',
  //   padding: '0',
  //   overflow: 'hidden',
  //   backgroundColor: '#2699FB',
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  // }
});
let contacts = [];
class Contact extends Component {
  state = {
    contacts: [],
    isVisible: false,
    switchValue: true,
    key: null,
    listKeys: []
  };
  toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    this.setState({ switchValue: value });
    //state changes according to switch
    //which will result in re-render the text
  };

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
    // console.log("data:", data); // feel free to uncomment, i needed to declutter terminal for my requests
    await this.setState({ contacts: data });
    await this.setState({
      listKeys: this.state.contacts.map((contact, i) => {
        contact.switch = true;
        contact.key = i;
      })
    });
  };
  goToNextPage = () => {
    this.props.navigation.navigate("Friends");
  };
  componentDidMount() {
    this.setState({ isVisible: true });
    this.permissionFlow();
    this.storeContacts();
  }

  // Save Contacts for db post request
  storeContacts = async () => {
    // Returns an array of objects for each contact
    const { data } = await Contacts.getContactsAsync({});
    slicedData = data.slice(0, 5);
    let contactIds = [];
    for (let i = 0; i < data.length; i++) {
      contactIds.push(data[i].id);
    }
    console.log("slicedData:", slicedData);
    await fetch(YOUR_NGROK_LINK + "/contacts/store", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ slicedData })
    });
  }; // End saveContacts

  render() {
    return (
      <View className="App">
        <View className="App-header">
          <LinearGradient
            colors={[
              "#010d25",
              "#0f345a",
              "#124375",
              "#124375",
              "#0f345a",
              "#010d25"
            ]}
            style={{
              width: "100%",
              height: "200%",
              padding: 0,
              alignItems: "center",
              borderRadius: 5
            }}
          >
            <Image
              source={require("../../assets/HayLogoHorz4.png")}
              style={styles.AppLogo}
              className="AppLogo"
              alt="logo"
            />
            <NavBar />
            {/* {console.log(this.state.contacts[0])} */}

            <ScrollView style={styles.item}>
              {this.state.contacts.map((l, i) => (
                <View>
                  <ListItem
                    key={i}
                    title={l.name}
                    bottomDivider={true}
                    leftAvatar={{
                      source: { uri: "https://i.pravatar.cc/300" }
                    }}
                    switch={{
                      value: this.state.switchValue,
                      onValueChange: value =>
                        this.setState({ switchValue: value })
                    }}
                    hideChevron
                    thumbColor="red"
                    trackColor={{
                      true: "yellow",
                      false: "purple"
                    }}
                  />
                </View>
              ))}
            </ScrollView>
            {/* <FlatList
              data={this.state.listKeys}
              renderItem={this.listItem}
            /> */}

            <Button title="next page" onPress={this.goToNextPage} />
          </LinearGradient>
        </View>
      </View>
    );
  }
}

export default Contact;
