'use strict';

const config = require('../configuration');
const morgan = require('morgan');
const log = require('../utils/logger');
const errors = require('restify-errors');
const rAuth = require('../business/authenticate');
//const rTrea = require('./treasures');
//const routerInstance = require('restify-router').Router();
const treasuresRouter = require('./treasures');
const mapsRouter = require('./maps');
const usersRouter = require('./users');

var router = function (srv) {

//Base path
const path = `${config.get('api:base')}/${config.get('api:version')}`;

  //Basic route
  srv.get('/', function (req, res, next) {
    log.error(req.path() + ': 403 - Forbidden');
    next(new errors.ForbiddenError());
  });

  srv.get(path+'/', function(req, res, next) {
    log.info('attending at ' + req.path());
    res.send('I only need page 95. It is my destiny.');
  });

  //API routes
  //Authentication
  srv.post(path+'/authenticate', rAuth.createToken);

  //User paths
  usersRouter.applyRoutes(srv);
  //Treasures paths
  treasuresRouter.applyRoutes(srv);
  //Map paths
  mapsRouter.applyRoutes(srv);

};

module.exports = router;
