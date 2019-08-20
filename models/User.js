import mongoose from "mongoose";
// import Contacts from "./Contacts";
// import contacts from "./Contacts";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  iss: { type: String },
  nickname: { type: String },
  contacts: { type: Array, ref: "Contacts" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// When a user is logged in, create a table for them with the title of their user name or id.
// Then make a table for all of their contacts to be put inside of that table
// ex:
//  - Devin Table
//    - Contacts
