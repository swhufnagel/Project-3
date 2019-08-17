import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  remind: { type: Boolean, default: false },
  number: { type: String }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
