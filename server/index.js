import express from "express";
import Expo from "expo-server-sdk";
import timestamp from "time-stamp";
import mongoose from "mongoose";
import { create } from "uuid-js";
// import { useScreens } from "react-native-screens";
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
// ===========================
app.post("/users/create", async (req, res) => {
  console.log("user req body:", req.body);
  const userInfo = req.body;
  // console.log("req.body:", userInfo);

  db.User.findOne({ sub: userInfo.sub }, async (err, doc) => {
    let response = { sucess: true, msg: "The User Created Successfully" };

    //The User doesn't exist => Add New User
    if (!doc) {
      let user = new db.User(userInfo);
      let createdUser = await user.save();
    } else {
      response.msg = "The User/Email is Already Exists";
      res.json(response);
    }
    console.log("response:", response);
  });
});
//  ===========================

// Store all contacts in database
app.post("/contacts/store", async (req, res) => {
  // console.log("contacts req.body:", req.body);
  // Array for database
  let response = [];
  let contactIds = [];
  const owner = req.body[0].owner;

  for (let i = 0; i < req.body.length; i++) {
    let contactLookup = await db.Contacts.findOne({ id: req.body[i].id });
    if (contactLookup) {
      // if a contact was found
      // console.log("user exists", contactLookup);
      contactIds.push(contactLookup._id);
    } else {
      // if a contact was not found
      let contact = new db.Contacts(req.body[i]);
      let createdContact = await contact.save();
      response.push(createdContact);
      console.log("contactLookup:", createdContact);
      contactIds.push(createdContact._id);
    }
  }
  console.log("contact response:", response);
  console.log("contact Ids ---", contactIds);

  db.User.findOneAndUpdate(
    { sub: owner },
    { $push: { contacts: contactIds } },
    (err, results) => {
      if (err) res.send(err);
      res.send(results);
    }
  );
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server Online on Port ${PORT_NUMBER}`);
});
