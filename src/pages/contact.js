import React, { Component } from "react";
import Friends from "./friends";
import * as Permissions from "expo-permissions";
import * as Contacts from "expo-contacts";
import {
  Alert,
  Switch,
  ScrollView,
  FlatList,
  Button,
  View,
  Image,
  Text,
  StyleSheet,
  DatePickerIOS
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ListItem, Overlay, Icon, Divider } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import LogoTitle from "../components/contacts/LogoTitle";
import { AuthSession } from "expo";

const YOUR_NGROK_LINK = "http://09b85fda.ngrok.io";

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
  },
  item: {
    width: "100%"
  },
  friends: {
    width: "100%"
  }
});

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      isVisible: false,
      switchValue: true,
      key: null,
      listKeys: [],
      loadRandom: false,
      nah: false,
      chosenDate: new Date(),
    };
    this.setDate = this.setDate.bind(this);

  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
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

  findContactSwitch = async (id) => {
    const index = await this.state.listKeys.findIndex(
      listKey => listKey.id === id
    );
    // console.log("index", index);
    const newState = (this.state.listKeys[index].switch = !this.state.listKeys[
      index
    ].switch);
    this.setState({ newState });
  };
  openScheduling = async (id) => {
    const index = await this.state.listKeys.findIndex(
      listKey => listKey.id === id
    );
    console.log("open or nah ", this.state.listKeys[index].openSchedule)
    const newState = (this.state.listKeys[index].openSchedule =
      !this.state.listKeys[index].openSchedule);
    console.log("newState", newState);
    this.setState({ newState });
  };
  //setting notification state
  _handleNotification = notification => {
    console.log("notification", notification);
    let message = `Say Hay to ${this.clickedContact}`;//needs correct contact name
    this.setState({ notification: message });
  };
  //get notification permission & token for device 
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
      this.notificationSubscription = Notifications.addListener(
        this._handleNotification
      );

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

    } else {
      alert("Must use physical device for Push Notifications");
    }
  };
  //send message to backend
  sendMessage = async () => {
    let currentDate = Date.now();
    currentDate = new Date(currentDate);

    // get the day, month and year from current date to create time to schedule
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();
    let not0 = new Date(year, month, date, 12);
    not0 = Date.parse(not0);
    const schedulingOptions0 = { time: not0, repeat: 'day' };
    // call the function to send notification at 12:00
    const localnotification = {
      to: YOUR_PUSH_TOKEN,
      sound: "default",
      title: "Don't forget to Say Hay today!",
      body: `Click here to stay connected`,
      data: { data: "goes here" }
    };
    await Notifications.scheduleLocalNotificationAsync(localnotification, schedulingOptions0);
    fetch(MESSAGE_ENPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: this.state.messageText
      })
    });
    this.sendPushNotification();
  };
  //send push notification to phone
  sendPushNotification = async () => {
    console.log("sending");
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
    const data = response;
    console.log("response", data);
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
        contact.openSchedule = false;
        contact.chosenDate = new Date();
        return contact;
      })
    });
  };
  // Save Contacts for db post request
  storeContacts = async () => {
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
    }).catch(function (err) {
      console.log("Error:", err);
      return err;
    });
  }; // End saveContacts

  componentDidMount() {
    this.setState({ isVisible: true });
    this.permissionFlow();
    this.storeContacts();
    this.registerForPushNotificationsAsync();
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)

  }
  componentDidUpdate() { }
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
          borderRadius: 0
        }}
      >
        <View className="App">
          <View className="App-header">
            <Overlay isVisible={this.state.isVisible}
              onBackdropPress={() => {
                this.setState({ isVisible: false });
                this.setState({ loadRandom: true });
              }}>
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
                            this.findContactSwitch(l.id)
                        }}
                        hideChevron
                        onPress={() => {
                          this.openScheduling(l.id);
                        }}
                        thumbColor="red"
                        trackColor={{
                          true: "yellow",
                          false: "purple"
                        }}
                      />
                      <Overlay isVisible={this.state.listKeys[i].openSchedule}
                        onBackdropPress={() => {
                          this.openScheduling(l.id, l.name);
                        }}
                        width={250}
                        height={300}
                      >
                        <Text style={{ textAlign: 'center' }}> Settings </Text>
                        <Text style={{ textAlign: 'center' }}> {l.name} </Text>
                        <DatePickerIOS
                          date={this.state.listKeys[i].chosenDate}

                          onDateChange={this.setDate}
                        />
                        <Button
                          title="Accept"
                          onPress={() => {
                            this.openScheduling(l.id, l.name);
                          }}
                        />
                      </Overlay>
                    </View>
                  ))}
                  <Button
                    title="Accept"
                    onPress={() => {
                      this.setState({ isVisible: false });
                      this.setState({ loadRandom: true });
                    }}
                  />
                </ScrollView>
              </View>
            </Overlay>

            {/* <FlatList
              data={this.state.listKeys}
              renderItem={this.listItem}
            /> */}
            <Friends
              contacts={this.state.listKeys}
              loadRandom={this.state.loadRandom}
            />
          </View>
        </View >
      </LinearGradient >
    );
  }
}

export default Contact;
