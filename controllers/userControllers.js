const db = require("../models");

// Define methods for the userController
module.exports = {
  // Get all contacts
  findAll: function(req, res) {
    db.User.find(req.query)
      .sort({ firstName: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // Get Contact by Id
  // Get doRemind Contacts
  // Get noRemind Contacts
};
