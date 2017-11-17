'use strict';

const mongoose = require('mongoose');
const log = require('../utils/logger');

var userSchema = new mongoose.Schema({
  '_id': {type: String, required: true},
  'mail': {type: String, required: true},
  'username': {type: String, required: true},
  'fname': {type: String, required: true},
  'lname': {type: String, required: true},
  'pass': {type: String, required: true},
  'supdate': {type: Date, required: true},
  'bloqList': [String],
  'bloquedAccount': {type: Boolean, required: true},
  'validatedMail': Boolean,
  'salt1': {type: String, required: true},
  'salt2': {type: String, required: true}
},
{
  _id: false
});

mongoose.model ('User', userSchema, 'users');
log.info("Model User registered");
