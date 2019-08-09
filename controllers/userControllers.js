const db = require("../models");

// Define methods for the userController
module.exports = {
  // Get all contacts
  findAll: function(req, res) {
    db.User.find(req.query)
      .sort({ firstName: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Get Contact by Id
  findById: function(req, res) {
    db.User.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Update
  update: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
