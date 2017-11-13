'use strict';

const mongoose = require('mongoose');
const log = require('../utils/logger');

var TreasureSchema = new mongoose.Schema({
  'owner_id': {type: String, required: 'true'},
  'creation_date': {type: Date, required: 'true'},
  'location': {type: [Number], index: '2dsphere', required: 'true'},
  'viewers': {type: [String], required: 'true'},
  'pre': {type: String, required: 'false'},
  'pos': {type: String, required: 'false'},
  'media': {type: String, required: 'false'},
  'message': {type: String, required: 'false'},
  'title': {type: String, required: 'false'}
});

mongoose.model('Treasure', TreasureSchema, 'treasures');
log.info("Model Treasure registered");
