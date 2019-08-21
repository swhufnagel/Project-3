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
  StyleSheet
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ListItem, Overlay, Icon } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import LogoTitle from "../components/contacts/LogoTitle";
import { AuthSession } from "expo";

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
      loadRandom: false
    };
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
                        // onChange={event => this.findContactSwitch(event, l.name, l.id)}
                        thumbColor="red"
                        trackColor={{
                          true: "yellow",
                          false: "purple"
                        }}
                      />
                    </View>
                  ))}
                </ScrollView>
                <Button
                  title="Accept"
                  onPress={() => {
                    this.setState({ isVisible: false });
                    this.setState({ loadRandom: true });
                  }}
                />
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
        </View>
      </LinearGradient>
    );
  }
}

export default Contact;
