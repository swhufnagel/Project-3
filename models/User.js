const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  contacts: { type: Array },
  doRemind: { type: Array },
  noRemind: { type: Array }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
