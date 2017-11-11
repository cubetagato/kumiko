'use strict';

const config = require('../configuration');
const log = require('./logger');
const restify = require('restify');
const bodyParser = require('body-parser');
const routes = require('../routes');

function createServer() {

  log.info('creating server...');

  var server = restify.createServer({
    name: config.get('server:name'),
    version: config.get('server:version'),
    acceptable: config.get('server:acceptable')
  });

  server.use(bodyParser.urlencoded({extended: true}));
  server.use(bodyParser.json());
  server.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });

  server.pre(restify.pre.pause());
  server.pre(restify.pre.sanitizePath());
  server.pre(restify.pre.userAgentConnection());

  routes(server);

  log.info('Server created');
  return server;

};

module.exports = {
  createServer: createServer
};
