const express = require('express');
const jsonParser = require('body-parser').json();

// Authorization
const mAuth = require('major-a').majorAuth;
// Error handler
const handleError = require(__dirname + '/../lib/handle-errors');
// Models
const Widget = require(__dirname + '/../models/widget');
// Router
const widgetRouter = module.exports = exports = express.Router();

// Get All Widgets
widgetRouter.get('/', mAuth(), (req, res) => {
  try {
    Widget.find({
      owner_id: req.user._id
    }, (err, widgets) => {
      // Errors
      if (err) return handleError.dbError(err, res);
      if (!widgets.length) return handleError.noData('No Widget', res);

      // Return Widgets
      res.status(200).json(widgets);
    });
  } catch(e) {
    res.status(500).json({
      msg: 'There was an error'
    });
  }
});

// Get Widget Data by Id
widgetRouter.get('/:id', mAuth(), (req, res) => {
  try {
    Widget.findOne({
      _id: req.params.id
    }, (err, foundData) => {
      // Errors
      if (err) return handleError.dbError(err, res);
      if (!foundData) return handleError.noData('No Data', res);
      // Return Data;
      res.status(200).json(foundData);
    });
  } catch (e) {
    return handleError.dbError('GET -- Catch hit', res);
  }
});

// Create new Widget
widgetRouter.post('/new', mAuth(), jsonParser, (req, res) => {
  try {
    var newWidget = new Widget();
    newWidget.owner_id = req.user._id;
    newWidget.type = req.body.type;
    newWidget.name = req.body.name;

    if(Object.keys(req.body.options).length > 0) {
      newWidget.options = req.body.options;
    }

    newWidget.save((err, savedWidget) => {
      // Errors
      if (err) return handleError.dbError(err, res);
      if (!savedWidget) return handleError.noData('Could not create', res);

      // Respond with data
      res.status(200).json(savedWidget);
    });
  } catch (e) {
    res.status(500).json({
      msg: 'There was an error.'
    });
  }
});


// Update Widget 
widgetRouter.put('/:id', mAuth(), jsonParser, (req, res) => {
  try {
    Widget.update({
      _id: req.params.id
    }, req.body, (err, foundData) => {
      // Errors
      if (err) return handleError.dbError(err, res);
      if (!foundData) return handleError.noData('Error', res);
      // Return Data;
      res.status(200).json(foundData);
    });

  } catch (e) {
    return handleError.dbError('PUT -- Catch hit', res);
  }
});

// Delete widget
widgetRouter.delete('/:id', mAuth(), jsonParser, (req, res) => {
  Widget.remove({
    _id: req.params.id
  }, (err, data) => {
    // Errors
    if (err) return handleError.dbError(err, res);
    if (!data) return handleError.noData('Error', res);
    // Return remove message
    res.status(200).json(data);
  });
});