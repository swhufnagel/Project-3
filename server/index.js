import express from "express";
import Expo from "expo-server-sdk";
import timestamp from "time-stamp";
import mongoose from "mongoose";
import db from "./../models";
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
    console.log("db:", db);
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
      console.log(`Total Rows: ${count}`);
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

app.post("/contacts/store", (req, res) => {
  console.log("req.body:", req.body);
  var contacts = req.body;
  // for (let i = 0; i < contacts.length; i++) {
  // db.User.create({
  //   name: req.body.name,
  //   number: contacts.phoneNumbers[0].number
  // });
  // }
  db.User.create(req.body).then(function(response) {
    console.log("response:", response);
    console.log("Stored contact in db");
  });
});

// Store array to database
app.post("/contacts/stash", (req, res) => {
  console.log("req.body:", req.body);
  const contacts = req.body;
  db.User.insertMany(contacts).then(function(response) {
    console.log(response);
  });
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server Online on Port ${PORT_NUMBER}`);
});
