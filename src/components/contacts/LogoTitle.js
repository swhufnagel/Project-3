import React, { Component } from 'react';
// import './FaceBookButton.css';
import { Image } from "react-native";

class LogoTitle extends Component {
    render() {
        return <Image
            source={require('../../pages/logo.png')}
            style={{ height: 50, width: 50 }} className="AppLogo" alt="logo" />

    }
}

export default LogoTitle;