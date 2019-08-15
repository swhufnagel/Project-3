import React from "react"

import { View, Text } from "react-native";
import { getCurrentFrame } from "expo/build/AR";

function MainBody() {
    return (
        <View>
            <Text 
            style={{ fontSize: 25, color: 'white', marginTop: 15 }} 
            >Firstname Lastname</Text>
        </View>
    )
}

export default MainBody