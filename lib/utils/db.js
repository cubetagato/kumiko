'use strict';

const config = require('../configuration');
const log = require('./logger');

const mongoose = require('mongoose');

const treasures = require('../models/treasure');

const options = {
  user: config.get('db:user'),
  pass: config.get('db:pass'),
  useMongoClient: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  autoIndex: false
};
const uri = `${config.get('db:host')}:${config.get('db:port')}/${config.get('db:name')}`;

mongoose.connect(uri, options);
mongoose.connection
  .on('error', (err) => {
    log.error('Database connection error', err);
    process.exit(1);
  })
  .once('open', () => {
    log.info('Database connection OK');
  })
