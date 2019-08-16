import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,Image,
  View, 
  TouchableOpacity,
} from 'react-native';
import { NavigationBar } from 'navigationbar-react-native';
 
const ComponentLeft = () => {
  return(
    <View style={{ flex: 1, alignItems: 'flex-start'}} >
       <TouchableOpacity style={ {justifyContent:'center', flexDirection: 'row'}}>
        <Image 
          source={require('./img/ic_back.png')}
          style={{ resizeMode: 'contain', width: 20, height: 20, alignSelf: 'center' }}
        />
        <Text style={{ color: 'white', }}>Back Home</Text>
      </TouchableOpacity>
    </View>
  );
};
 
const ComponentCenter = () => {
  return(
    <View style={{ flex: 1, }}>
       <Image
        source={require('./img/ic_logo.png')}
        style={{resizeMode: 'contain', width: 200, height: 35, alignSelf: 'center' }}
      />
    </View>
  );
};
 
const ComponentRight = () => {
  return(
    <View style={{ flex: 1, alignItems: 'flex-end', }}>
      <TouchableOpacity>
        <Text style={{ color: 'white', }}> Right </Text>
      </TouchableOpacity>
    </View>
  );
};
 
class NavBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar 
          componentLeft     = { () =>  <ComponentLeft />   }
          componentCenter   = { () =>  <ComponentCenter /> }
          componentRight    = { () =>  <ComponentRight />  }
          navigationBarStyle= {{ backgroundColor: '#215e79' }}
          statusBarStyle    = {{ barStyle: 'light-content', backgroundColor: '#215e79' }}
        />
      </View>
    );
  }
}

export default NavBar