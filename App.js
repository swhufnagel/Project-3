// SHOULD REPLACE APP.JS TO IMPLEMENT REACT-NATIVE NAVIGATION (SEE BELOW)
import React, { Fragment, Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./src/pages/home";
import Friends from "./src/pages/friends";
import Contact from "./src/pages/contact";

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends },
  Contact: { screen: Contact }
});

const App = createAppContainer(MainNavigator);

export default App;
