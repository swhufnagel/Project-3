import React from 'react'
import { Button } from "react-native";
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

// function NavBar() {
//     return (
//         <Text style={{ color: 'white', fontSize: 20 }}>This is the Navbar, try sliding down on it</Text>
//     )
// }

// export default NavBar

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', slignItems: 'center'}}>
                <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
    Home: HomeScreen,
    Settings: SettingsScreen,
});

export default createAppContainer(TabNavigator);