import React, { Component } from 'react';
// import logo2 from './logo2.svg';
import MainBody from "../components/contacts/MainBody"
import NavBar from "../components/contacts/NavBar"
// import '../App.css';
import SelectContact from '../components/contacts/SelectContact';
import FacebookButton from './../components/contacts/FacebookButton';
import { ThemeProvider } from 'react-native-elements';
import * as Permissions from "expo-permissions";
import * as Contacts from "expo-contacts";
import { Switch, ScrollView, FlatList, Button, View, Image, Text, StyleSheet } from "react-native";
import { ContactList } from "../components/contacts/List";
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem, Overlay } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale



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
    await this.setState({ contacts: data });
    await this.setState({
      listKeys: this.state.contacts.map((contact, i) => {
        contact.switch = true;
        contact.key = i;
      })
    });
  };
  goToNextPage = () => {
    this.props.navigation.navigate('Friends');
  }
  componentDidMount() {
    this.setState({ isVisible: true });
    this.permissionFlow();
  }
  render() {
    return (
      <View className="App" >
        <View className="App-header">
          <LinearGradient
            colors={['#010d25', '#0f345a', '#124375', '#124375', '#0f345a', '#010d25']}
            style={{ width: '100%', height: '200%', padding: 0, alignItems: 'center', borderRadius: 5 }}>
            <Image source={require('../../assets/HayLogoHorz4.png')} style={styles.AppLogo} className="AppLogo" alt="logo" />
            <NavBar />
            <Button title="next page" onPress={this.goToNextPage}></Button>

            <ScrollView style={styles.item}>
              {
                this.state.contacts.map((l, i) => (
                  <View>
                    <ListItem
                      key={i}
                      title={l.name}
                      bottomDivider={true}
                      leftAvatar={{ source: { uri: 'https://i.pravatar.cc/300' } }}
                      switch={{
                        value: this.state.switchValue,
                        onValueChange: value => this.setState({ switchValue: value }),
                      }}
                      hideChevron
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
            {/* <FlatList
              data={this.state.listKeys}
              renderItem={this.listItem}
            /> */}

          </LinearGradient>
        </View>
      </View >
    );
  }
}

export default Contact
