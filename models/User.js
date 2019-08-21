import mongoose from "mongoose";
// import Contacts from "./Contacts";
// import contacts from "./Contacts";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  iss: { type: String },
  nickname: { type: String },
  contacts: [{ type: Schema.Types.ObjectId, ref: "Contacts" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
