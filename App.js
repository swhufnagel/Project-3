import React, { Fragment, Component } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
} from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import { HomeScreen } from './src/components/HomeScreen';

const YOUR_PUSH_TOKEN = '';

const Images = [
  {
    uri: 'https://i.imgur.com/mxgtWKt.jpg',
    label: 'Cat on a blue blanket',
  },

  {
    uri: 'https://i.imgur.com/XCRnNWn.jpg',
    label: 'A cat toy',
  },

  {
    uri: 'https://i.imgur.com/dqQX1K0.jpg',
    label: 'A close up of a dog',
  },

  {
    uri: 'https://i.imgur.com/nZXbSbh.jpg',
    label: 'Sheep next to a cat',
  },

  {
    uri: 'https://i.imgur.com/mXCjefR.jpg',
    label: 'Cat laying on the grass',
  },

  {
    uri: 'https://i.imgur.com/AGyxRcc.jpg',
    label: 'Bird sitting on a railing',
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#abcdef'
  },
  image: {
    flex: 2,
    width: 320,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  imageLabel: {
    textAlign: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
    color: 'white',
    width: 320
  },
  notification: {
    textAlign: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
    color: 'white',
    width: 320,
    marginTop: '10%'
  },
  empty: {
    flex: 1
  }
});

export default class gimmePermission extends Component {
  state = {
    index: 0,
    imageWidth: null,
    contactPermission: null,
    notifactionPermission: null,
    status: "",
    notification: "",
    contacts: [],
  };
  componentDidMount() {
    this.registerForPushNotificationsAsync()
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  sendPushNotification = async () => {
    const message = {
      to: YOUR_PUSH_TOKEN,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const data = response._bodyInit;
    console.log(`Status & Response ID-> ${data}`);
  };

  permissionFlow = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    this.setState({ status: status });
    if (status !== 'granted') {
      console.log(status);
      alert('You will need to enable contacts to use our app!');
      return;
    }
    //get data
    const { data } = await Contacts.getContactsAsync({});
    console.log(data);
    this.setState({ contacts: data });
  }

  getRandomContact = () => {
    let randomNum = Math.floor(Math.random() * this.state.contacts.length + 1);
    let randomContact = this.state.contacts[randomNum].name;
    console.log(randomContact);
    alert(randomContact);
  }

  onSwipeLeft(event) {
    let newIndex = this.state.index - 1;
    if (newIndex < 0) {
      newIndex = Images.length - Math.abs(newIndex);
    }
    this.setState({
      index: newIndex,
    });
  }

  onSwipeRight(event) {
    let newIndex = this.state.index + 1;
    if (newIndex < 0) {
      newIndex = Images.length - Math.abs(newIndex);
    }
    this.setState({
      index: newIndex,
    });
  }

  onImageLayout(event) {
    this.setState({
      imageWidth: event.nativeEvent.layout.width,
    });
  }

  render() {
    const image = Images[this.state.index];
    return (
      // <ApplicationProvider
      //   mapping={mapping}
      //   theme={lightTheme}>
      //   <Layout style={{ flex: 1 }} />
      //   <HomeScreen />
      // </ApplicationProvider>

      <View style={styles.container}>
        <View style={styles.empty} />
        <GestureRecognizer
          onSwipeLeft={this.onSwipeLeft.bind(this)}
          onSwipeRight={this.onSwipeRight.bind(this)}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 1,
          }}
        >
          <Image
            source={{ uri: image.uri }}
            style={styles.image}
            onLayout={this.onImageLayout.bind(this)}
          />
        </GestureRecognizer>
        {/* <TouchableHighlight onPress={this.nextImage.bind(this)}
          style={styles.image}
        >
        </TouchableHighlight> */}
        <Text style={styles.imageLabel}>{image.label}</Text>
        <Text style={styles.imageLabel} onPress={this.permissionFlow}>
          Permissions: {this.state.status}
        </Text>
        <Button title="Get Random Contact" onPress={this.getRandomContact}>Get random contact</Button>
        {/* <Text style={styles.notification} onPress={this.sendPushNotification}>
          Click for Notification
        </Text> */}
        <View style={styles.empty} />
      </View>
    );
  }
}
