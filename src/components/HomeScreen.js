import * as React from 'react';
import { Layout, Text, Button } from 'react-native-ui-kitten';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';

state = {
    index: 0,
    imageWidth: null,
    contactPermission: null,
    notifactionPermission: null,
    status: "",
    notification: "",
};
permissionFlow = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    this.setState({ status: status }).bind(this);
    if (status !== 'granted') {
        console.log(status);
        alert('You will need to enable contacts to use our app!');
        return;
    }
    //get data
    const { data } = await Contacts.getContactsAsync({});
    console.log(data);
}
export const HomeScreen = () => (
    <Layout>
        <Text>Testing functionality</Text>
        <Button onPress={this.permissionFlow.bind(this)}>Get Permissions</Button>
        <Text>
            Permissions: {this.state.status}
        </Text>
        <Button>Generate Random Contact</Button>
        <Button>Send Notifictation</Button>
    </Layout >
);