![Say Hay](/assets/HayLogoVert3.png "SayHay")

# Say Hay
Say Hay is an iOS application developed to help you keep in touch with friends, family and associates. In this fast paced world we often do not have time to chat with all the firends that we have stored in our phones. At one time, long ago, it was the goal of social media to help solve this problem. However, it seems that social media has become more media and less social. Say Hay is intended to get back to the roots of using technology to improve our social interactions and help us connect with the people that we want to communicate with.

## How it Works
Say Hay is an iOS application that can be downloaded from the apple store. Once downloaded the user has access to the full functionality of the app. The home page will require a login and password from the user. Say Hay is integrated with auth0 and will allow the user to login with a google, facebook or github account. The user may also choose to create a unique login within the Say Hay app. 

Upon successful login the user will be confirmed. The next step of the application prompts the user to share the contacts in their phone with the application with a simple acceptance button. Once the user agrees to share their contacts with the app, the user will be redirected to a page that lists all of their contacts along with a radio button. The radio button allows the user to toggle weather they would like to include each contact in their list of Say Hay contacts.

For example, I would like to include my brother, neice and nephew in my list of Say Hay contacts--I love them as a part of my life but am not great about keeping in touch with them. At the same time I would like to leave out my boss and my favorite cake shop--I speak with them on a regualr basis. This is the purpose of the radio button.

We have also included push notifications on our app. When the user is searching through their contacts, if they press on a particular contact they will have the option to schedule an assigned date and time to be reminded to contact that individual.

Once the user has assigned which contacts to include in their Say Hay app an 'accept' button push will choose a random contact, display thier picture if there is one and prompt the user to either call or text that particular contact. If the user swipes up on the screen another random contact will be displayed. The list of selected contacts are stored in the app and allow the user to return at any time and select another random contact to message or speak with.

## Technologies Used
* React Native
* Expo Client
* XCode
* Auth0
* JavaScript
* Adobe XD
* MongoDB
* ngrok
* iOS

## Getting Started
Say Hay currently works only with iOS. If you would like to run Say Hay locally you need either an apple computer or an iPhone. With an apple computer you can run an iOS simulator on your computer through the expo client. You can use your iPhone as an emulator with either a windows or apple computer. If you choose to use an iPhone as an emulator you must download the expo client for iPhone from the apple store and be connected on the same network as your local computer.

* Fork the [Say Hay repository](https://github.com/swhufnagel/Project-3.git) from github.
* Navigate to the folder.
`$ cd Project-3`
* Run npm install.
`$ npm install`
* Run npm install expo command line interface.
`$ npm install expo-cli`
* Run yarn start.
`$ yarn start`

This will open a browser that displays a QR code along with a few options. If you are using an apple computer and would like to run the simulator on your computer click on *Run on iOS simulator.* You can also run the simulator on an iPhone. If you are using a windows computer you can **only** run the simulator on an iPhone. Switch the connection button from *LAN* to *Tunnel* and scan the QR code with the camera app on your iPhone. Say Hay should now be up and running on your device.

## Authors--github
Sean Hufnagel--swhufnagel
Devin Powell--Djpowell23
Brian Childs--brianchilds-22
Matthew Metrailer--MRMetrailer

## License
This project is licensed under the MIT License. See the LICENSE.md file for more info.

## Links
* Find Say Hay on [github](https://github.com/swhufnagel/Project-3.git)
* Find Say Hay on the [app store](https://www.apple.com/ios/app-store/)
* Static files for Say Hay on [github](https://github.com/swhufnagel/SayHay)
