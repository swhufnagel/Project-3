const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  owner: { type: String },
  id: { type: String },
  name: { type: String },
  remind: { type: Boolean },
  number: { type: String }
});

const Contacts = mongoose.model("Contacts", contactSchema);

module.exports = Contacts;
