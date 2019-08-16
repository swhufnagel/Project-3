import React, { Component } from 'react';
// import logo2 from './logo2.svg';
import MainBody from "../components/contacts/MainBody"
import NavBar from "../components/friends/NavBar"
// import '../App.css';
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

})
let contacts = [];
class Contact extends Component {

  state = {
    contacts: [],
    isVisible: false,
    switchValue: true,
    key: null,
    listKeys: [],
  }
  toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({ switchValue: value })
    //state changes according to switch
    //which will result in re-render the text
  }
  findContactSwitch = async (event, name, id) => {
    // console.log('LOGGING EVENT', event, name);
    console.log(id);
    const index = await this.state.listKeys.findIndex(listKey => listKey.id === id)
    console.log('index', index);
    const newState = this.state.listKeys[index].switch = !this.state.listKeys[index].switch
    this.setState({ newState })
  }
  permissionFlow = async () => {
    const newListKeys = this.state.contacts.map((contact, i) => {
      contact.switch = true;
      contact.key = i;
      return contact
    })
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
    this.props.navigation.navigate('Friends');
  }
  componentDidMount() {
    this.setState({ isVisible: true });
    this.permissionFlow();
  }
  componentDidUpdate() {
    // console.log('listKeys ', this.state.listKeys);
  }
  render() {
    return (
      <LinearGradient
        colors={['#010d25', '#0f345a', '#124375', '#124375', '#0f345a', '#010d25']}
        style={{ width: '100%', height: '200%', padding: 0, alignItems: 'center', borderRadius: 0 }}>
        <GestureRecognizer
          onSwipeDown={() => this.setState({ isVisible: true })}>
          <NavBar />
        </GestureRecognizer>
        <View className="App" >
          <View className="App-header">

            <Overlay isVisible={this.state.isVisible}>
              <ScrollView style={styles.item}>
                {
                  this.state.listKeys.map((l, i) => (
                    <View key={i}>
                      <ListItem
                        key={l.id}
                        title={l.name}
                        name={l.name}
                        bottomDivider={true}
                        leftAvatar={{ source: { uri: 'https://i.pravatar.cc/300' } }}
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
              }}></Button>
            </Overlay>
            {/* <FlatList
              data={this.state.listKeys}
              renderItem={this.listItem}
            /> */}
            <Friends />

          </View>
        </View >
      </LinearGradient >
    );
  }
}

export default Contact
