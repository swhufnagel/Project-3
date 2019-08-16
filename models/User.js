const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  contactType: { type: String },
  firstName: { type: String },
  id: { type: String },
  imageAvailable: { type: Boolean },
  lastName: { type: String },
  name: { type: String },
  phoneNumbers: [
    {
      countryCode: String,
      digits: String,
      id: String,
      label: String,
      number: String
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
