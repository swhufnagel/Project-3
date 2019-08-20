import express from "express";
import Expo from "expo-server-sdk";
import timestamp from "time-stamp";
import mongoose from "mongoose";
import { create } from "uuid-js";
const db = require("./../models");
// const routes = require("../routes");
const app = express();
const expo = new Expo();

// Define Middleware

let savedPushTokens = [];
const PORT_NUMBER = 3000;

const saveToken = token => {
  if (savedPushTokens.indexOf(token === -1)) {
    savedPushTokens.push(token);
  }
};

// Connect to the db
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/hayapp",
  function(err, db) {
    // console.log("db:", db);
    if (err) throw err;

    //     //Write databse Insert/Update/Query code here..
    //     // db.collection("users", function(err, collection) {
    //     //   collection.insert({
    //     //     id: 1,
    //     //     name: "Devin Powell",
    //     //     contacts: [
    //     //       "Sean Hufnagel",
    //     //       "Matthew Metrailer",
    //     //       "Brian Childs",
    //     //       "Mom",
    //     //       "Dad",
    //     //       "Brother"
    //     //     ],
    //     //     lastNotified: timestamp("YYYY/MM/DD")
    //     //   });
    //     // });

    // Log the total number of rows in database
    db.collection("users").countDocuments(function(err, count) {
      if (err) throw err;
      console.log(`Total User Rows: ${count}`);
    });

    db.collection("contacts").countDocuments(function(err, count) {
      if (err) throw err;
      console.log(`Total Contacts ${count}`);
    });
  }
);

const handlePushTokens = message => {
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    notifications.push({
      to: pushToken,
      sound: "default",
      title: "Message received!",
      body: message,
      data: { message }
    });
  }

  let chunks = expo.chunkPushNotifications(notifications);
  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

// Routing
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Push Notification Server Running");
});

app.post("/token", (req, res) => {
  saveToken(req.body.token.value);
  console.log(`Received push token, ${req.body.token.value}`);
  res.send(`Received push token, ${req.body.token.value}`);
});

app.post("/message", (req, res) => {
  handlePushTokens(req.body.message);
  console.log(`Received message, ${req.body.message}`);
  res.send(`Received message, ${req.body.message}`);
});

// Create User
app.post("/users/create", async (req, res) => {
  let user = new db.User(req.body);
  let createdUser = await user.save();
  console.log("Made new user:", createdUser);
  res.json(createdUser);
});

// Store all contacts in database
app.post("/contacts/store", async (req, res) => {
  // Array for database
  let response = [];

  for (let i = 0; i < req.body.length; i++) {
    db.Contacts.findOne({ id: req.body[i].id }, async (err, doc) => {
      let contResp = { success: true, msg: "The Contact Created Successfully" };

      //The User doesn't exist => Add New User
      if (!doc) {
        let contact = new db.Contacts(req.body[i]);
        let createdContact = await contact.save();
        response.push(createdContact);
      } else {
        contResp.msg = "The Contact Already Exists";
      }
    });
  }

  console.log("response1:", response);
  res.json(response);
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server Online on Port ${PORT_NUMBER}`);
});
