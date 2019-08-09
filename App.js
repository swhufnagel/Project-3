import React, { Fragment, Component } from "react";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Permissions from "expo-permissions";
import * as Contacts from "expo-contacts";
import Constants from "expo-constants";
import { Notifications } from "expo";
import Dashboard from "./src//components/Dashboard";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import { ListItem } from "react-native-elements";
// import firebase from "react-native-firebase";
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import { HomeScreen } from './src/components/HomeScreen';
import call from 'react-native-phone-call'
import Communications from 'react-native-communications';

const YOUR_PUSH_TOKEN = "http://0d754eaf.ngrok.io/token";
const MESSAGE_ENPOINT = 'http://0d754eaf.ngrok.io/message';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#abcdef"
  },
  image: {
    flex: 2,
    width: 320,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  imageLabel: {
    textAlign: "center",
    backgroundColor: "rgba(100, 100, 100, 0.5)",
    color: "white",
    width: 320
  },
  notification: {
    textAlign: "center",
    backgroundColor: "rgba(100, 100, 100, 0.5)",
    color: "white",
    width: 320,
    marginTop: "10%"
  },
  empty: {
    flex: 1
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: '#f6f6f6',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10
  }
});

export default class gimmePermission extends Component {
  state = {
    index: 0,
    imageWidth: null,
    contactPermission: null,
    notification: null,
    notifactionPermission: null,
    messageText: "",
    status: "",
    contacts: [],
    currentName: "",
  };
  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    // Create notification channel required for Android devices
    this.createNotificationChannel();

    // Ask notification permission and add notification listener
    this.checkPermission();
  }
  createNotificationChannel = () => { };

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // We've the permission
      this.notificationListener = firebase
        .notifications()
        .onNotification(async notification => {
          // Display your notification
          await firebase.notifications().displayNotification(notification);
        });
    } else {
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {
        Alert.alert("Unable to access the Notification permission. Please enable the Notification Permission from the settings");
      }
    }
  };

  _handleNotification = notification => {
    this.setState({ notification });
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log("token:", token);

      // I added this for getting the push token. It might be hard-coded in "YOUR_PUSH_TOKEN" variable as of now
      // but it said that is the same functionality as localhost:3000


      return fetch(YOUR_PUSH_TOKEN, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: {
            value: token
          },
          user: {
            username: "goobastank",
            name: "Devin Powell"
          }
        })
      });

      this.notificationSubscription = Notifications.addListener(
        this.handleNotification
      );
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  handleChangeText = (text) => {
    this.setState({ messageText: text });
  }

  sendMessage = async () => {
    fetch(MESSAGE_ENPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: this.state.messageText,
      }),
    });
    this.setState({ messageText: '' });
  }

  sendPushNotification = async () => {
    const message = {
      to: YOUR_PUSH_TOKEN,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { data: "goes here" }
    };
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });
    const data = response._bodyInit;
    console.log("response", data);

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
    console.log(data);
    this.setState({ contacts: data });
  }

  getRandomContact = async () => {
    let randomNum = Math.floor(Math.random() * this.state.contacts.length + 1);
    let randomContact = this.state.contacts[randomNum];
    alert(randomContact.name)
    this.setState({ Alert_Visibility: true });
    await this.setState({ currentName: randomContact.name });
    await this.setState({ currentNumber: randomContact.phoneNumbers[0].number });

    // this.callContact(randomContact.phoneNumbers[0].number, true)
  }
  callContact = () => {
    const contact = {
      number: this.state.currentNumber, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    }
    call(contact).catch(console.error)
  }
  textContact = () => {
    Communications.text(this.state.currentNumber, 'Test Text Here');
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.empty} />
        <Text style={styles.imageLabel} onPress={this.permissionFlow}>
          Permissions: {this.state.status}
        </Text>
        <TextInput
          value={this.state.messageText}
          onChangeText={this.handleChangeText}
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.sendMessage}
        >
          <Text onPress={this.state.notification ?
            this._handleNotification()
            : null} style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <Button title="Get Random Contact" onPress={this.getRandomContact}></Button>
        <Button title="Call Contact" onPress={this.callContact}></Button>
        <Button title="Text Contact" onPress={this.textContact.bind(this)}></Button>
        <View style={styles.empty} />
      </View>
    );
  }
}
