import React, { Component } from "react";
import { Platform } from 'react-native';
import { Button, ThemeProvider, colors, Divider, Input, Text } from 'react-native-elements';
import { AuthSession } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
// import toQueryString from 'to-querystring';
import jwtDecode from 'jwt-decode';



const theme = {
    colors: {
        ...Platform.select({
            default: colors.platform.android,
            ios: colors.platform.ios,
        }),
    },
};
function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}
class Login extends Component {
    state = {
        text: "",
        name: null,
    }
    _loginWithAuth0 = async () => {
        const auth0Domain = "https://dev-ph5frrsm.auth0.com";
        const auth0ClientId = "Jv5yuTYSdW5MFJ50z0EsuVv1z58LgQI5";
        const redirectUrl = AuthSession.getRedirectUrl();
        const queryParams = toQueryString({
            client_id: auth0ClientId,
            redirect_uri: redirectUrl,
            response_type: 'id_token', // id_token will return a JWT token
            scope: 'openid profile', // retrieve the user's profile
            nonce: 'nonce', // ideally, this will be a random value
        });
        let authUrl = `${auth0Domain}/authorize` + queryParams;

        console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
        console.log(`AuthURL is:  ${authUrl}`);
        const response = await AuthSession.startAsync({
            authUrl: authUrl
        });
        console.log('response ', response);
        if (response.type === 'success') {
            this.handleResponse(response.params);
        }
    };
    handleResponse = (response) => {
        if (response.error) {
            Alert('Authentication error', response.error_description || 'something went wrong');
            return;
        }

        // Retrieve the JWT token and decode it
        const jwtToken = response.id_token;
        const decoded = jwtDecode(jwtToken);

        const { name } = decoded;
        this.setState({ name });
    }
    render() {
        const { name } = this.state;
        return (
            <ThemeProvider theme={theme}>
                <Input
                    placeholder='Username'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='blue'
                        />
                    }
                />
                <Input
                    placeholder='Password'
                    secureTextEntry={true}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='blue'
                        />
                    }
                />
                {name ?
                    <Text >You are logged in, {name}!</Text> :
                    <Button title="Login Auth0?" navigation={this.props.navigation}
                        onPress={() => this._loginWithAuth0()} />
                }


            </ThemeProvider>
        );
    }
}

export default Login;