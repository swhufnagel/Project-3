import React, { Component } from 'react';
// import './FaceBookButton.css';
import { Button } from "react-native";

class FacebookButton extends Component {
    render() {
        return <Button
            title="Settings"
            className="settings"
            onPress={() => {
                this.props.isVisible = true;
            }}
        ></Button>
    }
}

export default FacebookButton