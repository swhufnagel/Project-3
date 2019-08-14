import React, { Component } from 'react'
// import './SelectContact.css';
import { Button } from "react-native";
class SelectContact extends Component {
    render() {
        return <Button title="Select Contact" className="SelectContact" style={{ display: 'flex', justifyContent: 'center'}}></Button>
    }
}

export default SelectContact