import React, { Component } from 'react';
// import './FaceBookButton.css';
import { Button } from "react-native";

class Container extends Component {
    render() {
        return <div style={{background-image: linear-gradient(125deg, #010d25,#0f345a,#124375,#124375,#0f345a,#010d25),
            background-size: 200%,
            animation: bganimation 15s infinite,
            height: 100%,

          @keyframes bganimation {
            0%{
                background-position: 0% 100%;
            }
            50% {
                background-position: 100% 0%;
            }
            100% {
                background-position: 0% 100%;
        
          }}

    }
}

export default Container