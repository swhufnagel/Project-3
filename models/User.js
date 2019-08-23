const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  sub: { type: String },
  nickname: { type: String },
  contacts: [{ type: Schema.Types.ObjectId, ref: "Contacts" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
