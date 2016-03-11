const mongoose = require('mongoose');

const Config = require(__dirname + '/config.js');

var userFileSchema = mongoose.Schema({
  owner_id: {
    type: String,
    required: true
  },
  name: {
    first: String,
    last: String
  },
  config: Object,
  default_config: String,
  news_token: {
    type: String,
    default: '9159dc7a40755189f3356208d9fd6691:14:61615709'
  },
  weather_token: {
    type: String,
    default: 'ac63c928ee86e580e68b306e9ddf62fb'
  }
});

// Initialize
userFileSchema.methods.initialize = function() {
  // Create new config doc and return it
  return new Promise((resolve, reject) => {
    var newConfig = new Config();
    newConfig.owner_id = this.owner_id;
    newConfig.save((err, savedConfig) => {
      // Reject promise
      if (err) return reject(err);
      // Save Default
      this.setAsDefault(savedConfig._id);
      // Resolve Promise
      return resolve(savedConfig);
    });
  });
};

// Populate config obj
userFileSchema.methods.populateConfig = function() {
  return new Promise((resolve, reject) => {
    Config.findOne({
      _id: this.default_config
    }, (err, data) => {
      // Error
      if (err || !data) {
        console.log('Error retreiving default');
        reject(err);
      }

      // Populate Modules
      data.populateModules().then((widgetsArray) => {
        data.modules = widgetsArray;
        this.config = data;
        // Resolve promise with data
        return resolve(this);
      });
    });
  });
};

// Set default config
userFileSchema.methods.setAsDefault = function(config_id) {
  this.default_config = config_id;
  this.save();
};

module.exports = exports = mongoose.model('UserFile', userFileSchema);