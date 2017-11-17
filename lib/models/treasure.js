'use strict';

const mongoose = require('mongoose');
const log = require('../utils/logger');

var TreasureSchema = new mongoose.Schema({
  'owner_id': {type: String, required: 'true'},
  'creation_date': {type: Date, required: 'true'},
  'location': {
    'type': {type: String, required: true},
    'coordinates': [Number]
  },
  'viewers': {type: [String], required: 'true'},
  'pre': {type: String},
  'pos': {type: String},
  'media': {type: String},
  'message': {type: String},
  'title': {type: String}
});

mongoose.model('Treasure', TreasureSchema, 'treasures');
log.info("Model Treasure registered");
