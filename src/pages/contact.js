import React, { Component } from "react";
import SelectContact from '../components/contacts/SelectContact';
import Friends from './friends';
import { ThemeProvider } from 'react-native-elements';
import * as Permissions from "expo-permissions";
import * as Contacts from "expo-contacts";
import { Switch, ScrollView, FlatList, Button, View, Image, Text, StyleSheet } from "react-native";
import { ContactList } from "../components/contacts/List";
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem, Overlay } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from 'react-native-elements'

const YOUR_NGROK_LINK = "http://150a151a.ngrok.io";


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

  // AppLogo: {
  //   // marginTop: '10%',
  //   width: 200,
  //   height: 30
  
  // },


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
  },
  item: {
    width: "100%"
  },
  friends: {
    width: "100%"
  }
});

class Contact extends Component {
static navigationOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: "#124375",
      marginRight: "2%",
      marginLeft: "2%"
    },
     headerTitle: (
      <Image style={{ width: 200, height: 30 }}source={require('../../assets/HayLogoHorz3.png')} className="AppLogo" alt="logo" />
    ),
    headerRight: (
      // <Button
      //   title="settings"
      //   />
      <Icon
        name="cog"
        type="font-awesome"
        color="#2699FB"
        />
    ),
    headerLeft:(
      // <Button
      // title="logout"
      // />
      <Icon
        name='arrow-left'
        type='font-awesome'
        color='#2699FB'
        />
    ),
  };
}

  state = {
    contacts: [],
    isVisible: false,
    switchValue: true,
    key: null,
    listKeys: [],
    loadRandom: false
  };
  toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    this.setState({ switchValue: value });
    //state changes according to switch
    //which will result in re-render the text

  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <GestureRecognizer onSwipeDown={navigation.getParam("showSettings")}>
          <LogoTitle />
        </GestureRecognizer>
      ),
      headerRight: (
        <Icon
          name="settings"
          type="material"
          color="#517fa4"
          onPress={navigation.getParam("showSettings")}
        />
      ),
      headerLeft: (
        <Icon
          name="directions-walk"
          type="material"
          color="#517fa4"
          onPress={navigation.getParam("nowLogout")}
        />
      )
    };
  };
  nowLogout = () => {
    console.log("logging out");
    Alert.alert(
      "Logout from Hay?",
      "This will also log you out from any services you logged in with",
      [
        {
          text: "Logout",
          onPress: async () => {
            let authUrl =
              "https://dev-ph5frrsm.auth0.com/v2/logout?returnTo=https://auth.expo.io/@swhufnagel/hay&client_id=Jv5yuTYSdW5MFJ50z0EsuVv1z58LgQI5";
            const response = await AuthSession.startAsync(
              {
                authUrl: authUrl
              },
              () => {
                AuthSession.dismiss();
              }
            );
            console.log("response ", response);
            this.props.navigation.navigate("Home");
          }
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };
  showSettings = () => {
    this.setState({ isVisible: true });
  };

  findContactSwitch = async (event, name, id) => {
    const index = await this.state.listKeys.findIndex(
      listKey => listKey.id === id
    );
    console.log("index", index);
    const newState = (this.state.listKeys[index].switch = !this.state.listKeys[
      index
    ].switch);
    this.setState({ newState });
  };

  permissionFlow = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    this.setState({ status: status });
    if (status !== "granted") {
      // console.log("status:", status);
      alert("You will need to enable contacts to use our app!");
      return;
    }
    //get data
    const { data } = await Contacts.getContactsAsync({});
    this.setState({ contacts: data });
    this.setState({
      listKeys: data.map((contact, i) => {
        contact.switch = true;
        contact.key = i;
        return contact;
      })
    });
  };
  goToNextPage = () => {
    this.props.navigation.navigate("Friends");
  };
  componentDidMount() {
    this.setState({ isVisible: true });
    this.permissionFlow();
    // this.storeContacts();
  }
  componentDidUpdate() {}
  componentWillMount() {
    this.props.navigation.setParams({
      showSettings: this.showSettings,
      nowLogout: this.nowLogout
    });
  }

  // Change Remind Boolean
  // changeRemind = async () => {
  //   console.log("THIS:", this.state);
  // };

  render() {
    return (
      <LinearGradient
        colors={['#010d25', '#0f345a', '#124375', '#124375', '#0f345a', '#010d25']}
        style={{ width: '100%', height: '200%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
        <GestureRecognizer
          onSwipeDown={() => this.setState({ isVisible: true })}>
         
        </GestureRecognizer>

            <Overlay isVisible={this.state.isVisible}>
              <View>
                <ScrollView style={styles.item}>
                  {this.state.listKeys.map((l, i) => (
                    <View key={i}>
                      <ListItem
                        key={l.id}
                        title={l.name}
                        name={l.name}
                        bottomDivider={true}
                        leftAvatar={{
                          source: { uri: "https://i.pravatar.cc/300?img=" }
                        }}
                        switch={{
                          value: this.state.listKeys[i].switch,
                          onChange: event =>
                            this.findContactSwitch(event, l.name, l.id)
                        }}
                        hideChevron
                        thumbColor="red"
                        trackColor={{
                          true: "yellow",
                          false: "purple"
                        }}
                      />
                    </View>
                  ))
                }
              </ScrollView>
              <Button title="Accept" onPress={() => {
                this.setState({ isVisible: false });
              }}></Button>
            </Overlay>
            <Friends />
         </LinearGradient >

    );
  }
}

export default Contact;
