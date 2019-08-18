import React, { Component } from "react";
// import logo2 from './logo2.svg';
import MainBody from "../components/contacts/MainBody"
import NavBar from "../components/friends/NavBar"
// import '../App.css';
import SelectContact from '../components/contacts/SelectContact';
import Friends from './friends';
import { ThemeProvider } from 'react-native-elements';
import * as Permissions from "expo-permissions";
import * as Contacts from "expo-contacts";
import { Alert, Switch, ScrollView, FlatList, Button, View, Image, Text, StyleSheet } from "react-native";
import { ContactList } from "../components/contacts/List";
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem, Overlay, Icon } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import LogoTitle from '../components/contacts/LogoTitle';
import { AuthSession } from "expo";
import * as WebBrowser from 'expo-web-browser';

const YOUR_NGROK_LINK = "http://4bc3511d.ngrok.io";

const styles = StyleSheet.create({
  App: {
    // backgroundSize: '200%',
    height: '100%'
  },

  AppHeader: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  AppLogo: {
    marginTop: '10%',
    width: '80%',
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
  },
  item: {
    width: '100%'
  },
  friends: {
    width: '100%'
  }
});
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
class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      isVisible: false,
      switchValue: true,
      key: null,
      listKeys: [],
      loadRandom: false,
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <GestureRecognizer
        onSwipeDown={navigation.getParam('showSettings')}>
        <LogoTitle />
      </GestureRecognizer>,
      headerRight: (
        <Icon
          name='settings'
          type='material'
          color='#517fa4'
          onPress={navigation.getParam('showSettings')}
        />
      ),
      headerLeft: (
        <Icon
          name='directions-walk'
          type='material'
          color='#517fa4'
          onPress={navigation.getParam('nowLogout')}
        />
      )
    };
  }
  nowLogout = () => {
    console.log("logging out");
    Alert.alert(
      'Logout from Hay?',
      'This will also log you out from any services you logged in with',
      [
        {
          text: 'Logout', onPress: async () => {

            let authUrl = 'https://dev-ph5frrsm.auth0.com/v2/logout?returnTo=https://auth.expo.io/@swhufnagel/hay&client_id=Jv5yuTYSdW5MFJ50z0EsuVv1z58LgQI5';
            const response = await AuthSession.startAsync({
              authUrl: authUrl
            });
            console.log('response ', response);
            // await WebBrowser.openBrowserAsync(
            //   'https://dev-ph5frrsm.auth0.com/v2/logout?returnTo=https://auth.expo.io/@swhufnagel/hay&client_id=Jv5yuTYSdW5MFJ50z0EsuVv1z58LgQI5'
            // )
            this.props.navigation.navigate('Home');
          }
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }],
      { cancelable: true }
    )
  }
  showSettings = () => {
    this.setState({ isVisible: true })
  }


  findContactSwitch = async (event, name, id) => {
    // console.log('LOGGING EVENT', event, name);
    // console.log(id);
    const index = await this.state.listKeys.findIndex(listKey => listKey.id === id)
    console.log('index', index);
    const newState = this.state.listKeys[index].switch = !this.state.listKeys[index].switch
    this.setState({ newState })
  }

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
    // console.log(data);
    this.setState({ contacts: data });
    this.setState({
      listKeys: data.map((contact, i) => {
        contact.switch = true;
        contact.key = i;
        return contact
      })
    })
  };
  goToNextPage = () => {
    this.props.navigation.navigate("Friends");
  };
  componentDidMount() {
    // console.log("mounting first comp")
    this.setState({ isVisible: true });
    this.permissionFlow();
    this.storeContacts();
  }
  componentDidUpdate() {
    // console.log('listKeys ', this.state.listKeys);
  }
  componentWillMount() {
    this.props.navigation.setParams({ showSettings: this.showSettings, nowLogout: this.nowLogout });
  }
  // Save Contacts for db post request
  storeContacts = async () => {
    // Returns an array of objects for each contact
    const { data } = await Contacts.getContactsAsync({});
    console.log("PHONE:", data[0].phoneNumbers[0].number);
    slicedData = data.slice(0, 5);
    let contacts = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].phoneNumbers[0].number) {
        let contact = {
          name: data[i].name // name
          // number: JSON.stringify(data[i].phoneNumbers[0].number) // phone number not working for some reason
        };
        contacts.push(contact);
      }
    }
    await fetch(YOUR_NGROK_LINK + "/contacts/store", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contacts)
    });
  }; // End saveContacts

  render() {
    return (
      <LinearGradient
        colors={['#010d25', '#0f345a', '#124375', '#124375', '#0f345a', '#010d25']}
        style={{ width: '100%', height: '200%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
        <View className="App" >
          <View className="App-header">

            <Overlay isVisible={this.state.isVisible}>
              <View>
                <ScrollView style={styles.item}>
                  {
                    this.state.listKeys.map((l, i) => (
                      <View key={i}>
                        <ListItem
                          key={l.id}
                          title={l.name}
                          name={l.name}
                          bottomDivider={true}
                          leftAvatar={{ source: { uri: 'https://i.pravatar.cc/300?img=' } }}
                          switch={{
                            value: this.state.listKeys[i].switch,
                            onChange: event => this.findContactSwitch(event, l.name, l.id)
                          }}
                          hideChevron
                          // onChange={event => this.findContactSwitch(event, l.name, l.id)}
                          thumbColor="red"
                          trackColor={{
                            true: "yellow",
                            false: "purple",
                          }}
                        />
                      </View>

                    ))
                  }
                </ScrollView>
                <Button title="Accept" onPress={() => {
                  this.setState({ isVisible: false });
                  this.setState({ loadRandom: true });
                }}></Button>
              </View>
            </Overlay>

            {/* <FlatList
              data={this.state.listKeys}
              renderItem={this.listItem}
            /> */}
            <Friends

              contacts={this.state.listKeys}
              loadRandom={this.state.loadRandom} />
          </View>
        </View >
      </LinearGradient >
    );
  }
}

export default Contact;
