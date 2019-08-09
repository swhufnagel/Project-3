const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/hayapp");

const userSeed = [
  {
    contacts: [
      "Matthew Metrailer",
      "Brian Childs",
      "Sean Hufnagel",
      "Devin Powell"
    ],
    doRemind: ["Devin Powell", "Sean Hufnagel"],
    noRemind: ["Matthew Metrailer", "Brian Childs"]
  }
];

db.User.remove({})
  .then(() => db.User.collection.insert(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
