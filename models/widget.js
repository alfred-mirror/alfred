const mongoose = require('mongoose');

var widgetSchema = new mongoose.Schema({
  name: {type: String, required: true},
  owner_id: {type: String, required: true},
  type: {
    type: String,
    required: true
  },
  options: {

    // Commute
    origin: {
      lat: {
        type: Number,
        min: -90,
        max: 90
      },
      long: {
        type: Number,
        min: -180,
        max: 180
      }
    },
    destination: {
      lat: {
        type: Number,
        min: -90,
        max: 90
      },
      long: {
        type: Number,
        min: -180,
        max: 180
      }
    },
    commuteUnits: {
      type: String,
      enum: ['imperial', 'metric'],
      default: 'imperial'
    },
    mode: {
      type: String,
      enum: ['walking', 'driving'],
      default: 'driving'
    },


    // Greeting
    greetingStyle: {
      type: String,
      enum: ['timebased', 'random', 'randomTicker'],
      default: 'timebased'
    },

    // NEWS
    newsContent: {
      type: String,
      enum: ['mostPopular', 'topStories'],
      default: 'topStories'
    },
    top: {
      type: Number,
      default: 3
    },


    // TIME
    twentyFour: {
      type: Boolean,
      default: false
    },
    dayLong: {
      type: Boolean,
      default: true
    },
    monthLong: {
      type: Boolean,
      default: true
    },


    // Weather
    location: {
      lat: {
        type: Number,
        min: -90,
        max: 90,
        default: 47.61665
      },
      long: {
        type: Number,
        min: -180,
        max: 180,
        default: -122.35079
      }
    },
    weatherUnits: {
      type: String,
      enum: ['imperial', 'metric'],
      default: 'imperial'
    }
  }
});

module.exports = exports = mongoose.model('widgets', widgetSchema);



