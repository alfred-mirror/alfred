const express = require('express');
const jsonParser = require('body-parser').json();

const handleError = require(__dirname + '/../lib/handle-errors');

// UserFile
const UserFile = require(__dirname + '/../models/userFile');

// Major A
const majorA = require('major-a');
const mAuth = majorA.majorAuth;

module.exports = exports = function(io) {
  const userRouter = express.Router();

  // Get User File
  userRouter.get('/:id', mAuth(), (req, res) => {
    UserFile.findOne({
      owner_id: req.params.id
    }, (err, data) => {
      // Errors
      if (err) return handleError.dbError(err, res);
      if (!data) return handleError.noData('data', res);

      // Respond with data
      res.status(200).json(data);
    });
  });

  // Update User Profile
  userRouter.put('/update/:id', mAuth(), jsonParser, (req, res) => {
    // Find File, Update and Return
    UserFile.findOneAndUpdate({
      owner_id: req.params.id
    }, {
      $set: {
        name: req.body.name
      }
    }, {
      new: true
    }, (err, foundUserFile) => {
      // Check error
      if (err || !foundUserFile) {
        return res.status(500).json({
          msg: 'User Not Found.'
        });
      }


      // Populate default config
      foundUserFile.populateConfig()
        .then(function(newData) {
          // Push new file to display
          io.to(req.user._id).emit('UPDATED_CONFIG', newData);
        });

      // Send back new file
      res.status(200).json(foundUserFile);
    });
  });

  // Return router
  return userRouter;
};
