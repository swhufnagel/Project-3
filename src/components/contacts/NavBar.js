import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
    render () {
        return <div>
            <ul>
                <li><a href="default.asp">Friend</a></li>
                <li><a href="news.asp">Family</a></li>
                <li><a href="contact.asp">Business</a></li>
                <li><a href="about.asp">Other</a></li>
            </ul>
        </div>
    }
}

export default NavBar